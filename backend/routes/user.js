import express from "express";

import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/profile", isAuthenticated, getUserProfile);
router.put("/profile", isAuthenticated, updateUserProfile);
router.get("/all-users", isAuthenticated, getAllUsers);

export default router;
