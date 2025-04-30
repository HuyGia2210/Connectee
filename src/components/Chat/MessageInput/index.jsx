import { useState } from "react";

export default function MessageInput({ friend, onSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || !friend) return;

    onSendMessage(trimmed);
    setMessage(""); // Reset input field
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(); // Gửi tin nhắn khi nhấn Enter
    }
  };

  return (
    <div className="px-6 py-4 border-t bg-white flex items-center space-x-4">
      <input
        type="text"
        placeholder={friend ? "Nhập tin nhắn..." : "Chọn bạn để chat"}
        disabled={!friend}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={!friend}
        className="text-blue-600 hover:text-blue-800 text-2xl transition-colors disabled:text-gray-300"
      >
        ➤
      </button>
    </div>
  );
}
