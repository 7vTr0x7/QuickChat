import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuickChatUser",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("QuickChatUser", UserSchema);
