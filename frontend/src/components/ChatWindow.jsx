import axios from "axios";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ChatWindow = ({ selectedUser, user }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const socket = io(apiUrl, { withCredentials: true });

  useEffect(() => {
    if (!user) return;

    socket.emit("join", user._id);

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const fetchChats = async () => {
      if (!user || !selectedUser) return;

      try {
        const { data } = await axios.get(
          `${apiUrl}/api/chat/messages/${user._id}/${selectedUser._id}`,
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.error("Failed to fetch chats", error.message);
      }
    };

    fetchChats();
  }, [selectedUser, user]);

  const sendMessage = async () => {
    if (!message.trim() || !user || !selectedUser) return;

    try {
      const { data } = await axios.post(
        `${apiUrl}/api/chat/send`,
        {
          sender: user._id,
          receiver: selectedUser._id,
          message,
        },
        { withCredentials: true }
      );

      socket.emit("sendMessage", data.chat);

      setMessages((prevMessages) => [...prevMessages, data.chat]);
      setMessage("");
    } catch (error) {
      console.error("Failed to send message", error.message);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-screen bg-[#121212]">
      <div className="flex items-center bg-[#1f1f1f] p-4 border-b border-gray-700 shadow-md">
        <img
          src={selectedUser?.imageUrl || "/default-avatar.png"}
          alt={selectedUser?.userName || "User"}
          className="w-12 h-12 rounded-full border-2 border-green-500 mr-3"
        />
        <p className="text-white text-lg font-semibold">
          {selectedUser?.userName || "User"}
        </p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 max-w-xs rounded-xl shadow-md mb-2 text-white text-lg 
                        ${
                          msg.sender === user._id
                            ? "bg-[#2a2a2a] ml-auto"
                            : "bg-[#2a2a2a]"
                        }
                        `}>
            {msg.message}
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#1f1f1f] flex items-center border-t border-gray-700">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-[#2a2a2a] text-white outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="ml-3 bg-[#2a2a2a] text-white px-4 py-2 rounded-lg ">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
