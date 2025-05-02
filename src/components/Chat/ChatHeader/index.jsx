export default function ChatHeader({ friend }) {
  if (!friend) {
    return (
      <div className="px-4 py-2 border-b bg-white dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">
          Select a friend to start chatting
        </p>
      </div>
    );
  }

  // Lấy chữ cái đầu của từ cuối cùng trong nickname
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
    <div className="px-4 py-2 border-b bg-white dark:bg-gray-800 flex items-center space-x-4">
      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
        {getAvatarLetter(friend.fullName)}
      </div>
      <div>
        <div className="font-semibold text-gray-800 dark:text-white">
          {getFullName(friend.fullName)}
        </div>
        {friend.nickname !== "embeddedAIByConnectee" && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            last seen 5 mins ago
          </div>
        )}
      </div>
    </div>
  );
}
