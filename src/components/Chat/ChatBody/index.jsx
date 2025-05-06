import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { format, isToday } from "date-fns";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./ChatBody.css";
import locales from "@/language/locales";

export default function ChatBody({
  friend,
  messages,
  aiMess,
  onAiMess,
  loading,
  setLoading,
  lang,
  scrMode,
}) {
  const [myNick, setMyNick] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [aiChatMess, setAIChatMess] = useState([]);
  const chatContainerRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL;

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
        try {
          const res = await axios.get(`${API_URL}/api/ai/get-history`, {
            withCredentials: true,
          });
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
            `${API_URL}/api/chat/get-chat`,
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
      <div
        className="flex-1 flex items-center justify-center"
        style={{
          backgroundColor: scrMode === "light" ? "#f9fafb" : "#111827",
          color: scrMode === "light" ? "#374151" : "#ffffff",
        }}
      >
        <span className="text-sm sm:text-base">
          {locales[lang].chooseFriend}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={chatContainerRef}
      className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4"
      style={{
        maxHeight: "calc(100vh - 180px)",
        backgroundColor: scrMode === "light" ? "#f9fafb" : "#111827",
      }}
    >
      {loading && !isEmbeddedAI ? (
        <div
          className="flex justify-center text-sm"
          style={{ color: scrMode === "light" ? "#6b7280" : "#d1d5db" }}
        >
          {locales[lang].fetchMessage}
        </div>
      ) : (
        <>
          {friend ? (
            friend.nickname === "embeddedAIByConnectee" &&
            friend.fullName === "embeddedAIByConnectee" ? (
              aiMess.length === 0 ? (
                <div
                  className="flex justify-center text-sm"
                  style={{ color: scrMode === "light" ? "#6b7280" : "#d1d5db" }}
                >
                  {locales[lang].messageNotAvailable}
                </div>
              ) : (
                aiMess.map((msg, idx) => (
                  <div key={`ai-${idx}`}>
                    {/* Prompt (user) */}
                    <div className="flex justify-end mb-2">
                      <div
                        className="max-w-[80%] sm:max-w-[70%] p-2 sm:p-3 shadow text-xs sm:text-sm rounded-2xl"
                        style={{
                          backgroundColor:
                            scrMode === "light" ? "#d1fae5" : "#065f46",
                          color: scrMode === "light" ? "#000" : "#fff",
                        }}
                      >
                        <div>{msg.prompt}</div>
                        <div
                          className="flex justify-end text-xs mt-1"
                          style={{
                            color: scrMode === "light" ? "#9ca3af" : "#d1d5db",
                          }}
                        >
                          <span>{formatTimestamp(msg.timestamp)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Response (AI) */}
                    <div className="flex justify-start mb-4">
                      <div
                        className="max-w-[80%] sm:max-w-[70%] p-2 sm:p-3 shadow text-xs sm:text-sm rounded-2xl"
                        style={{
                          backgroundColor:
                            scrMode === "light" ? "#fff" : "#1f2937",
                          color: scrMode === "light" ? "#000" : "#fff",
                        }}
                      >
                        <div
                          className="font-semibold text-xs mb-1"
                          style={{
                            color: scrMode === "light" ? "#4b5563" : "#d1d5db",
                          }}
                        >
                          @Gemini
                        </div>
                        <div className="whitespace-pre-line">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.result}
                          </ReactMarkdown>
                        </div>
                        <div
                          className="flex justify-end text-xs mt-1"
                          style={{
                            color: scrMode === "light" ? "#9ca3af" : "#d1d5db",
                          }}
                        >
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
                  <div
                    className="flex justify-center text-sm"
                    style={{ color: scrMode === "light" ? "#6b7280" : "#d1d5db" }}
                  >
                    {locales[lang].messageNotAvailable}
                  </div>
                ) : (
                  <>
                    {[...chatMessages, ...messages]
                      .filter(
                        (msg) =>
                          (msg.sender === myNick &&
                            msg.receiver === friend.nickname) ||
                          (msg.sender === friend.nickname &&
                            msg.receiver === myNick)
                      )
                      .map((msg, idx) => (
                        <div
                          key={`msg-${idx}`}
                          className={`flex ${
                            isMyMessage(msg) ? "justify-end" : "justify-start"
                          } mb-2`}
                        >
                          <div
                            className="max-w-[80%] sm:max-w-[70%] p-2 sm:p-3 shadow text-xs sm:text-sm rounded-2xl"
                            style={{
                              backgroundColor: isMyMessage(msg)
                                ? scrMode === "light"
                                  ? "#d1fae5"
                                  : "#065f46"
                                : scrMode === "light"
                                ? "#fff"
                                : "#1f2937",
                              color: scrMode === "light" ? "#000" : "#fff",
                            }}
                          >
                            {!isMyMessage(msg) && (
                              <div
                                className="font-semibold text-xs mb-1"
                                style={{
                                  color:
                                    scrMode === "light" ? "#4b5563" : "#d1d5db",
                                }}
                              >
                                @{msg.sender}
                              </div>
                            )}
                            <div className="whitespace-pre-line">
                              {msg.content}
                            </div>
                            <div
                              className="flex justify-end text-xs mt-1"
                              style={{
                                color:
                                  scrMode === "light" ? "#9ca3af" : "#d1d5db",
                              }}
                            >
                              <span>{formatTimestamp(msg.timestamp)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </>
            )
          ) : (
            <div
              className="flex justify-center text-sm"
              style={{ color: scrMode === "light" ? "#6b7280" : "#d1d5db" }}
            >
              {locales[lang].pleaseSelectFriend}
            </div>
          )}
        </>
      )}
    </div>
  );
}
