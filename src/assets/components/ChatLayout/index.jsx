import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import MessageInput from "./MessageInput";

export default function ChatLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <ChatHeader />
        <ChatBody />
        <MessageInput />
      </div>
    </div>
  );
}
