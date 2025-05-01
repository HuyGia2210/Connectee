import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format, isToday } from 'date-fns';

export default function ChatBody({ friend, messages }) {
  const [myNick, setMyNick] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const nick = localStorage.getItem("nickname");
    if (nick) setMyNick(nick);
  }, []);

  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!friend || !myNick) return;
      setLoading(true);

      try {
        const res = await axios.post(
          "http://localhost:8080/api/chat/get-chat",
          { user1: myNick, user2: friend.nickname },
          { withCredentials: true }
        );
        setChatMessages(res.data);
      } catch (err) {
        console.error("Lỗi lấy lịch sử chat:", err);
        setChatMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChatMessages();
  }, [friend, myNick]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, messages]);

  const formatTimestamp = (timestamp) => {
    const ts = typeof timestamp === 'object' && '$numberLong' in timestamp
      ? parseInt(timestamp.$numberLong)
      : parseInt(timestamp);

    const date = new Date(ts);
    return isToday(date)
      ? format(date, "HH:mm")
      : format(date, "dd/MM/yyyy HH:mm");
  };

  const isMyMessage = (msg) => msg.sender === myNick;

  if (!friend) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Hãy chọn một người bạn để bắt đầu trò chuyện.
      </div>
    );
  }

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto bg-cover p-6 space-y-4"
      style={{ maxHeight: 'calc(100vh - 150px)' }}
    >

      {loading ? (
        <div className="text-center text-gray-500">Đang lấy tin nhắn...</div>
      ) : chatMessages.length === 0 ? (
        <div className="text-center text-gray-500">Không có tin nhắn</div>
      ) : (
        <>
          {chatMessages
            .filter(
              (msg) =>
                (msg.sender === myNick && msg.receiver === friend.nickname) ||
                (msg.sender === friend.nickname && msg.receiver === myNick)
            )
            .map((msg, idx) => (
              <div
                key={`history-${idx}`}
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
                    <span id="time">{formatTimestamp(msg.timestamp)}</span>
                    {/* <span>{msg.status}</span> */}
                  </div>
                </div>
              </div>
            ))}
        </>
      )}

      {/* Tin nhắn mới chưa được lưu */}
      {chatMessages.length !== 0 &&
        messages
          .filter(
            (msg) =>
              (msg.sender === myNick && msg.receiver === friend.nickname) ||
              (msg.sender === friend.nickname && msg.receiver === myNick)
          )
          .map((msg, idx) => (
            <div
              key={`new-${idx}`}
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
                  <span>{formatTimestamp(msg.timestamp)}</span>
                  <span>{msg.status}</span>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
