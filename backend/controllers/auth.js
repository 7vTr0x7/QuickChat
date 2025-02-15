import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import "dotenv/config";
import { sendCookie } from "../utils/features.js";

export const register = async (req, res) => {
  try {
    const { userName, imageUrl, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      userName,
      email,
      imageUrl,
      password: hashedPassword,
    });

    if (user) {
      sendCookie(user, res, "Register Successfully");
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to register user." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    sendCookie(user, res, "Logged In Successfully");
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to register user." });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(201)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "Development",
      })
      .json({
        success: true,
        message: "Logged out",
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to logout" });
  }
};
