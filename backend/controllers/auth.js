import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import "dotenv/config";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      res.status(404).json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ userName, email, password: hashedPassword });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    if (user) {
      res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          success: true,
          message: "Registered Successfully",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to register user." });
  }
};
