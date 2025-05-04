import locales from "@/language/locales";

export default function ChatHeader({ friend, lang, scrMode }) {
  if (!friend) {
    return (
      <div
        className="px-4 py-3 border-b"
        style={{
          backgroundColor: scrMode === "light" ? "#ffffff" : "#1f2937", // white / gray-800
          borderColor: scrMode === "light" ? "#e5e7eb" : "#374151", // gray-200 / gray-700
        }}
      >
        <p
          style={{
            color: scrMode === "light" ? "#6b7280" : "#d1d5db", // gray-500 / gray-400
          }}
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
      className="px-4 py-3 border-b flex items-center space-x-4 shadow-sm"
      style={{
        backgroundColor: scrMode === "light" ? "#ffffff" : "#1f2937", // white / gray-800
        borderColor: scrMode === "light" ? "#e5e7eb" : "#374151", // gray-200 / gray-700
      }}
    >
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow">
        {getAvatarLetter(friend.fullName)}
      </div>
      <div className="flex-1">
        <div
          className="font-semibold"
          style={{
            color: scrMode === "light" ? "#1f2937" : "#ffffff", // gray-800 / white
          }}
        >
          {getFullName(friend.fullName)}
        </div>
        {friend.nickname !== "embeddedAIByConnectee" && (
          <div
            className="text-sm"
            style={{
              color: scrMode === "light" ? "#6b7280" : "#d1d5db", // gray-500 / gray-400
            }}
          >
            {/* Đang hoạt động 5 phút trước */}
          </div>
        )}
      </div>
    </div>
  );
  
}
