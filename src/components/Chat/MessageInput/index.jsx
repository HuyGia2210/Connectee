"use client"

import { useState, useRef, useEffect } from "react"

export default function MessageInput({ friend, onSendMessage, loading, setLoading }) {
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
    console.log(trimmed)
    setMessage("") // Reset input field
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend() // Send message when Enter is pressed
    }
  }

  return (
    <div className="px-6 py-4 border-t bg-white flex items-center space-x-4">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          placeholder={friend ? "Nhập tin nhắn..." : "Chọn bạn để chat"}
          disabled={!friend || loading === true}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 resize-none"
          style={{
            minHeight: `${lineHeight}px`,
            maxHeight: `${maxHeight}px`,
            lineHeight: `${lineHeight}px`,
          }}
        />
      </div>
      <button
        onClick={handleSend}
        disabled={!friend || loading === true}
        className="text-blue-600 hover:text-blue-800 text-2xl transition-colors disabled:text-gray-300"
      >
        ➤
      </button>
    </div>
  )
}
