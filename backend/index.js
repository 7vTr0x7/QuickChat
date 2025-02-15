import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { Server } from "socket.io";

import { initializeDatabase } from "./db/db.connection.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";

config();
const app = express();
app.use(express.json());


const urls = process.env.FRONTEND_URL.split(",");

app.use(
  cors({
    origin: urntials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/user", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

initializeDatabase();

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: urls,
    credentials: true,
  },
});

let onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("join", (userId) => {
    onlineUsers.set(userId, socket.id);
    console.log(`User ${userId} is online`);
  });

  socket.on("sendMessage", ({ sender, receiver, message }) => {
    console.log(`Message from ${sender} to ${receiver}: ${message}`);

    const receiverSocket = onlineUsers.get(receiver);
    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", { sender, message });
    }
  });

  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        console.log(`User ${userId} went offline`);
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});
