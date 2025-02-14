import express from "express";
import { getUserProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.get("/profile", isAuthenticated, getUserProfile);

export default router;
