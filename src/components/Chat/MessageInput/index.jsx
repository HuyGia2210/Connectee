import { useState, useRef, useEffect } from "react";
import locales from "@/language/locales";

export default function MessageInput({ friend, onSendMessage, loading, lang, scrMode }) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const lineHeight = 24;
  const maxLines = 3;
  const maxHeight = lineHeight * maxLines;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${lineHeight}px`;
      const scrollHeight = textareaRef.current.scrollHeight;

      if (scrollHeight <= maxHeight) {
        textareaRef.current.style.height = `${scrollHeight}px`;
        textareaRef.current.style.overflowY = "hidden";
      } else {
        textareaRef.current.style.height = `${maxHeight}px`;
        textareaRef.current.style.overflowY = "auto";
      }
    }
  }, [message]);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed || !friend) return;

    onSendMessage(trimmed);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isLight = scrMode === "light";

  return (
    <div
      className="px-3 sm:px-6 py-3 sm:py-4 border-t flex items-center space-x-3 sm:space-x-4"
      style={{
        backgroundColor: isLight ? "#ffffff" : "#1f2937",
        borderTopColor: isLight ? "#e5e7eb" : "#374151",
      }}
    >
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          placeholder={friend ? locales[lang].typeMessage : locales[lang].pleaseSelectFriend3}
          disabled={!friend || loading === true}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-3 sm:px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none text-sm"
          style={{
            backgroundColor: isLight ? "#f3f4f6" : "#374151",
            color: isLight ? "#111827" : "#f9fafb",
            borderColor: isLight ? "#d1d5db" : "#4b5563",
            minHeight: `${lineHeight}px`,
            maxHeight: `${maxHeight}px`,
            lineHeight: `${lineHeight}px`,
          }}
        />
      </div>
      <button
        onClick={handleSend}
        disabled={!friend || loading === true}
        className="text-xl sm:text-2xl transition-colors disabled:opacity-50"
        style={{
          color: !friend || loading
            ? isLight
              ? "#d1d5db"
              : "#4b5563"
            : isLight
            ? "#2563eb"
            : "#60a5fa",
        }}
      >
        ➤
      </button>
    </div>
  );
}
