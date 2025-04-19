// src/assets/components/Sidebar/index.jsx
import { ScrollArea } from "@/assets/components/ui/scroll-area";

const conversations = [
  { name: "Chatgram", message: "Web was updated.", time: "19:48", unread: 1, type: "group" },
  { name: "Jessica Drew", message: "Ok, see you later", time: "18:30", unread: 2, type: "personal" },
  { name: "David Moore", message: "You: I don't remember anything 😅", time: "18:16", type: "personal" },
  { name: "Greg James", message: "I got a job at SpaceX 🚀", time: "18:02", type: "personal" },
  { name: "Emily Dorson", message: "Table for four, 5PM. Be there.", time: "17:42", type: "personal" },
  { name: "Office Chat", message: "Lewis: All done mate 😅", time: "17:08", type: "group" },
  { name: "Announcements", message: "Channel created", time: "16:15", unread: 1, type: "announcement" },
  { name: "Little Sister", message: "Tell mom I will be home for tea 💜", time: "Wed", type: "personal" },
  { name: "Art Class", message: "Emily: 🎨", time: "Tue", type: "group" },
];

export default function Sidebar() {
  return (
    <div className="w-[320px] bg-white flex flex-col border-r border-gray-300">
      {/* Header với tiêu đề, icon menu và thanh tìm kiếm */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-lg">Conntectee</div>
          <i className="ri-menu-line text-xl text-gray-600 hover:text-blue-600 cursor-pointer"></i>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>
      </div>

      {/* Danh sách cuộc trò chuyện */}
      <ScrollArea className="flex-1">
        <ul>
          {conversations.map((conv, idx) => (
            <li
              key={idx}
              className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {conv.type === "announcement" ? (
                  <span className="text-green-500 font-bold">A</span>
                ) : conv.type === "group" ? (
                  <span className="text-gray-500">👥</span>
                ) : (
                  <span className="text-gray-500">👤</span>
                )}
              </div>

              {/* Nội dung */}
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="font-medium">{conv.name}</div>
                  <div className="text-sm text-gray-500">{conv.time}</div>
                </div>
                <div className="text-sm text-gray-500 truncate">{conv.message}</div>
              </div>

              {/* Thông báo chưa đọc */}
              {conv.unread && (
                <div className="ml-2 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center">
                  {conv.unread}
                </div>
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}