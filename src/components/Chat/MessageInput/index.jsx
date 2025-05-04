import { useState, useRef, useEffect } from "react"
import locales from "@/language/locales"

export default function MessageInput({ friend, onSendMessage, loading, lang, scrMode }) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef(null)

  const lineHeight = 24 // Height of one line in pixels
  const maxLines = 3 // Maximum number of lines before showing scrollbar
  const maxHeight = lineHeight * maxLines // Maximum height before scrollbar appears

  // Adjust textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to calculate the right height
      textareaRef.current.style.height = `${lineHeight}px` // Base height (1 line)

      // Calculate new height based on scroll height
      const scrollHeight = textareaRef.current.scrollHeight

      if (scrollHeight <= maxHeight) {
        // If content is 3 lines or less, expand normally without scrollbar
        textareaRef.current.style.height = `${scrollHeight}px`
        textareaRef.current.style.overflowY = "hidden"
      } else {
        // If content exceeds 3 lines, fix height and show scrollbar
        textareaRef.current.style.height = `${maxHeight}px`
        textareaRef.current.style.overflowY = "auto"
      }
    }
  }, [message])

  const handleSend = () => {
    const trimmed = message.trim()
    if (!trimmed || !friend) return

    onSendMessage(trimmed)
    setMessage("") // Reset input field
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend() // Send message when Enter is pressed
    }
  }

  const isLight = scrMode === "light"

  return (
    <div
      className="px-6 py-4 border-t flex items-center space-x-4"
      style={{
        backgroundColor: isLight ? "#ffffff" : "#1f2937", // white / gray-800
        borderTopColor: isLight ? "#e5e7eb" : "#374151",  // gray-200 / gray-700
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
          className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
          style={{
            backgroundColor: isLight ? "#f3f4f6" : "#374151", // gray-100 / gray-700
            color: isLight ? "#111827" : "#f9fafb",           // gray-900 / gray-50
            borderColor: isLight ? "#d1d5db" : "#4b5563",      // gray-300 / gray-600
            minHeight: `${lineHeight}px`,
            maxHeight: `${maxHeight}px`,
            lineHeight: `${lineHeight}px`,
          }}
        />
      </div>
      <button
        onClick={handleSend}
        disabled={!friend || loading === true}
        className="text-2xl transition-colors disabled:opacity-50"
        style={{
          color: !friend || loading
            ? isLight
              ? "#d1d5db"
              : "#4b5563" // gray-300 / gray-600
            : isLight
            ? "#2563eb"
            : "#60a5fa", // blue-600 / blue-400
        }}
      >
        ➤
      </button>
    </div>
  )
}
