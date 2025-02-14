import { Chat } from "../models/chat.js";

export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    if (!sender || !receiver || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields (sender, receiver, message) are required.",
      });
    }

    const chat = await Chat.create({ sender, receiver, message });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      chat,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
};

export const getAllChats = async (req, res) => {
  try {
    const { user1, user2 } = req.params;

    if (!user1 || !user2) {
      return res.status(400).json({
        success: false,
        message: "Both user1 and user2 are required.",
      });
    }

    const messages = await Chat.find({
      $or: [
        { sender: user1, receiver: user2 },
        { sender: user2, receiver: user1 },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({
      success: true,
      message: "Chats fetched successfully",
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
      error: error.message,
    });
  }
};
