import locales from "@/language/locales";

export default function ChatHeader({ friend, lang, scrMode }) {
  if (!friend) {
    return (
      <div
        className="px-3 sm:px-4 py-3 border-b"
        style={{
          backgroundColor: scrMode === "light" ? "#ffffff" : "#1f2937",
          borderColor: scrMode === "light" ? "#e5e7eb" : "#374151",
        }}
      >
        <p
          style={{
            color: scrMode === "light" ? "#6b7280" : "#d1d5db",
          }}
          className="text-sm"
        >
          {locales[lang].pleaseSelectFriend2}
        </p>
      </div>
    );
  }

  const getAvatarLetter = (nickname) => {
    if (!nickname) return "?";
    if (nickname === "embeddedAIByConnectee") return "AI";
    const parts = nickname.trim().split(" ");
    return parts[parts.length - 1][0]?.toUpperCase() || "?";
  };

  const getFullName = (fullName) => {
    if (fullName === "embeddedAIByConnectee") return "Gemini";
    return fullName;
  };

  return (
    <div
      className="px-3 sm:px-4 py-3 border-b flex items-center space-x-3 sm:space-x-4 shadow-sm"
      style={{
        backgroundColor: scrMode === "light" ? "#ffffff" : "#1f2937",
        borderColor: scrMode === "light" ? "#e5e7eb" : "#374151",
      }}
    >
      <div
        className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg shadow"
      >
        {getAvatarLetter(friend.fullName)}
      </div>
      <div className="flex-1">
        <div
          className="font-semibold text-sm sm:text-base"
          style={{
            color: scrMode === "light" ? "#1f2937" : "#ffffff",
          }}
        >
          {getFullName(friend.fullName)}
        </div>
        {friend.nickname !== "embeddedAIByConnectee" && (
          <div
            className="text-xs"
            style={{
              color: scrMode === "light" ? "#6b7280" : "#d1d5db",
            }}
          >
            {/* Đang hoạt động 5 phút trước */}
          </div>
        )}
      </div>
    </div>
  );
}

