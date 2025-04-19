import { ScrollArea } from "@/components/ui/scroll-area";

export default function Sidebar() {
  return (
    <div className="w-[320px] bg-white flex flex-col border-r border-gray-300">
      <div className="p-4 font-semibold text-lg">Chatgram</div>
      <ScrollArea className="flex-1">
        <ul>
          {[
            "Jessica Drew",
            "David Moore",
            "Greg James",
            "Emily Dorson",
            "Office Chat",
            "Announcements",
            "Little Sister",
            "Art Class",
          ].map((name, idx) => (
            <li
              key={idx}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b"
            >
              <div className="font-medium">{name}</div>
              <div className="text-sm text-gray-500 truncate">
                Last message preview...
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}