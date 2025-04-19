// src/assets/components/ChatBody/index.jsx
export default function ChatBody() {
  const messages = [
    {
      sender: "other",
      content: "OMG 😳 do you remember what you did last night at the work night out?",
      time: "18:12",
      status: "✔️",
      liked: true,
    },
    {
      sender: "me",
      content: "no haha",
      time: "18:16",
      status: "✔️✔️",
      liked: false,
    },
    {
      sender: "me",
      content: "i don't remember anything 😅",
      time: "18:16",
      status: "✔️✔️",
      liked: false,
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[url('/bg-telegram.png')] bg-cover p-6 space-y-4">
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-white rounded-full text-gray-600 text-sm">
          Today
        </span>
      </div>

      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[70%] p-3 shadow text-sm ${
              msg.sender === "me"
                ? "bg-green-100 rounded-tl-xl rounded-bl-xl rounded-tr-xl"
                : "bg-white rounded-tr-xl rounded-br-xl rounded-tl-xl"
            }`}
          >
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