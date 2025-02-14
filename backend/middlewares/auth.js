import { jwt } from "jsonwebtoken";
import "dotenv/config";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req?.cookies;

  if (!token) {
    res.status(400).json({ success: false, message: "Login first" });
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);

  next();
};
