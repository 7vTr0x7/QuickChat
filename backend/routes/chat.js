import express from "express";
import { getAllChats, sendMessage } from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/send", isAuthenticated, sendMessage);

router.get("/messages/:user1/:user2", isAuthenticated, getAllChats);

export default router;
