import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format, isToday } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./ChatBody.css"


export default function ChatBody({ friend, messages, aiMess, onAiMess, loading, setLoading }) {
  const [myNick, setMyNick] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [aiChatMess, setAIChatMess] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const nick = localStorage.getItem("nickname");
    if (nick) setMyNick(nick);
  }, []);

  useEffect(() => {
    const fetchChatMessages = async () => {
      if (!friend || !myNick) return;
      setLoading(true);

      if (
        friend.nickname === "embeddedAIByConnectee" &&
        friend.fullName === "embeddedAIByConnectee"
      ) {
        let result = {};
        try {
          const res = await axios.get(
            "http://localhost:8080/api/ai/get-history",
            {
              withCredentials: true,
            }
          );
          if (res.status === 200) {
            result = res.data;
          }
          console.log(result);
          onAiMess(res.data);
        } catch (error) {
          console.error("Failed to get AI chat history", error);
          onAiMess([]);
        } finally {
          setLoading(false);
        }
      } else {
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
      }
    };

    fetchChatMessages();
  }, [friend, myNick]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages, messages, aiMess]);

  const formatTimestamp = (timestamp) => {
    try {
      let ts;

      if (!timestamp) return "??:??";

      if (typeof timestamp === "object" && "$numberLong" in timestamp) {
        ts = parseInt(timestamp.$numberLong);
      } else if (
        typeof timestamp === "number" ||
        typeof timestamp === "string"
      ) {
        ts = parseInt(timestamp);
      } else {
        return "??:??";
      }

      const date = new Date(ts);
      if (isNaN(date.getTime())) return "??:??";

      return isToday(date)
        ? format(date, "HH:mm")
        : format(date, "dd/MM/yyyy HH:mm");
    } catch (err) {
      console.error("Lỗi xử lý timestamp:", timestamp, err);
      return "??:??";
    }
  };

  const isMyMessage = (msg) => msg.sender === myNick;
  const isEmbeddedAI = friend?.nickname === "embeddedAIByConnectee";

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
      style={{ maxHeight: "calc(100vh - 150px)" }}
    >
      {loading && !isEmbeddedAI ? (
        <div className="text-center text-gray-500">Đang lấy tin nhắn...</div>
      ) : (
        <>
          {friend.nickname === "embeddedAIByConnectee" &&
          friend.fullName === "embeddedAIByConnectee" ? (
            aiMess.length === 0 ? (
              <div className="text-center text-gray-500">Không có tin nhắn</div>
            ) : (
              aiMess.map((msg, idx) => (
                <div key={`ai-${idx}`}>
                  {/* Prompt của người dùng (hiện bên phải) */}
                  <div className="flex justify-end mb-2">
                    <div className="max-w-[70%] p-3 shadow text-sm bg-green-100 rounded-tl-xl rounded-bl-xl rounded-tr-xl">
                      <div className="text-sm">{msg.prompt}</div>
                      <div className="flex justify-end text-xs mt-1 text-gray-400">
                        <span>{formatTimestamp(msg.timestamp)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Câu trả lời của AI (hiện bên trái) */}
                  <div className="flex justify-start mb-4">
                    <div className="max-w-[70%] p-3 shadow text-sm bg-white rounded-tr-xl rounded-br-xl rounded-tl-xl">
                      <div className="font-semibold text-xs text-gray-600 mb-1">
                        @Gemini
                      </div>
                      <div className="whitespace-pre-line">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.result}</ReactMarkdown>
                      </div>

                      <div className="flex justify-end text-xs mt-1 text-gray-400">
                        <span>{formatTimestamp(msg.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <>
              {chatMessages.length === 0 && messages.length === 0 ? (
                <div className="text-center text-gray-500">
                  Không có tin nhắn
                </div>
              ) : (
                <>
                  {chatMessages
                    .filter(
                      (msg) =>
                        (msg.sender === myNick &&
                          msg.receiver === friend.nickname) ||
                        (msg.sender === friend.nickname &&
                          msg.receiver === myNick)
                    )
                    .map((msg, idx) => (
                      <div
                        key={`history-${idx}`}
                        className={`flex ${
                          isMyMessage(msg) ? "justify-end" : "justify-start"
                        }`}
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
                          <div className="whitespace-pre-line">{msg.content}</div>
                          <div className="flex justify-end space-x-1 text-xs mt-1 text-gray-400">
                            <span id="time">
                              {formatTimestamp(msg.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}

                  {messages
                    .filter(
                      (msg) =>
                        (msg.sender === myNick &&
                          msg.receiver === friend.nickname) ||
                        (msg.sender === friend.nickname &&
                          msg.receiver === myNick)
                    )
                    .map((msg, idx) => (
                      <div
                        key={`new-${idx}`}
                        className={`flex ${
                          isMyMessage(msg) ? "justify-end" : "justify-start"
                        }`}
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
                          <div className="whitespace-pre-line">{msg.content}</div>
                          <div className="flex justify-end space-x-1 text-xs mt-1 text-gray-400">
                            <span>{formatTimestamp(msg.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
