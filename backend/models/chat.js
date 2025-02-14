import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "QuickChatUser" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "QuickChatUser" },
    message: String,
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", ChatSchema);
