import jwt from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req?.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "Login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    if (!req.user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
