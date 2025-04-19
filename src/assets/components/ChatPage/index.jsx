
import Sidebar from "../Sidebar";
import ChatHeader from "../ChatHeader";
import ChatBody from "../ChatBody";
import MessageInput from "../MessageInput";

export default function ChatPage() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        <ChatBody />
        <MessageInput />
      </div>
    </div>
  );
}