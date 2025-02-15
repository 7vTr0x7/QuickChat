const MessageBubble = ({ text, isSender }) => {
  return (
    <div
      className={`p-3 max-w-xs rounded-lg ${
        isSender ? "bg-blue-500 text-white self-end" : "bg-gray-300"
      }`}>
      {text}
    </div>
  );
};

export default MessageBubble;
