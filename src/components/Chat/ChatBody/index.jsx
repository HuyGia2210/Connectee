import { useEffect, useState } from "react";

export default function ChatBody({ friend, messages}) {
  const [myNick, setMyNick] = useState("");

  useEffect(() => {
    const nick = localStorage.getItem("nickname");
    if (nick) setMyNick(nick);
  }, []);

  console.log(messages);

  if (!friend) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Hãy chọn một người bạn để bắt đầu trò chuyện.
      </div>
    );
  }

  const isMyMessage = (msg) => msg.sender === myNick;

  return (
    <div className="flex-1 overflow-y-auto bg-cover p-6 space-y-4">
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-white rounded-full text-gray-600 text-sm">
          Today
        </span>
      </div>

      {messages
        .filter(
          (msg) =>
            (msg.sender === myNick && msg.receiver === friend.nickname) ||
            (msg.sender === friend.nickname && msg.receiver === myNick)
        )
        .map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${isMyMessage(msg) ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 shadow text-sm ${
                isMyMessage(msg)
                  ? "bg-green-100 rounded-tl-xl rounded-bl-xl rounded-tr-xl"
                  : "bg-white rounded-tr-xl rounded-br-xl rounded-tl-xl"
              }`}
            >
              {!isMyMessage(msg) && (
                <div className="font-semibold text-xs text-gray-600 mb-1">
                  @{msg.sender}
                </div>
              )}
              {msg.content}
              <div className="flex justify-end space-x-1 text-xs mt-1 text-gray-400">
                {msg.liked && <span className="text-red-500">♥️</span>}
                <span>{msg.time}</span>
                <span>{msg.status}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
