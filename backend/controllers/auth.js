import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import "dotenv/config";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      res.status(404).json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ userName, email, password: hashedPassword });

    if (user) {
      sendCookie(user, res, "Register Successfully");
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to register user." });
  }
};
