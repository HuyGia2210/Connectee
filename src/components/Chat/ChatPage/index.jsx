import Sidebar from "../Sidebar";
import ChatHeader from "../ChatHeader";
import ChatBody from "../ChatBody";
import MessageInput from "../MessageInput";
import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios";

export default function ChatPage({ lang, scrMode }) {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [aiChatMess, setAiChatMess] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlineMap, setOnlineMap] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const stompRef = useRef(null);
  const myNick = useRef(localStorage.getItem("nickname"));

  const handleSelectFriend = (f) => {
    setSelectedFriend(f);
    setMessages([]);
    setIsSidebarOpen(false); // Đóng sidebar khi chọn bạn trên mobile
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const API_URL = import.meta.env.VITE_API_URL;
  const WS_URL = import.meta.env.VITE_WS_URL;

  const getOnlineFriend = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/user/get-online-friends-by-nickname?nickname=` +
          localStorage.getItem("nickname"),
        { credentials: "include" }
      );
      const nicknames = await res.json();

      const updates = {};
      nicknames.forEach((nick) => {
        updates[nick] = "true";
      });

      setOnlineMap((prev) => ({ ...prev, ...updates }));
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    if (!myNick.current) return console.error("No nickname in localStorage");

    const client = new Client({
      brokerURL: `${WS_URL}/ws?nickname=${myNick.current}`,
      connectHeaders: {},
      debug: (str) => console.log(str),
      onConnect: () => {
        client.subscribe("/user/queue/messages", async (message) => {
          const msg = JSON.parse(message.body);

          try {
            const res = await axios.get(
              `${API_URL}/api/user/get-nickname-by-username?username=` +
                msg.receiver
            );

            if (res.status === 200) {
              msg.receiver = res.data;
            }
          } catch (error) {
            console.error("Failed to fetch nickname", error);
          }

          try {
            const res = await axios.get(
              `${API_URL}/api/user/get-nickname-by-username?username=` +
                msg.sender
            );

            if (res.status === 200) {
              msg.sender = res.data;
            }
          } catch (error) {
            console.error("Failed to fetch nickname", error);
          }

          const newMsg = {
            ...msg,
            timestamp: Date.now(),
          };

          setMessages((prev) => [...prev, newMsg]);
        });

        getOnlineFriend();

        try {
          client.subscribe("/user/queue/status", (message) => {
            const { nickname, isOnline } = JSON.parse(message.body);
            setOnlineMap((prev) => ({ ...prev, [nickname]: isOnline }));
          });
        } catch (e) {
          console.error("Failed to fetch nickname", e);
        }
      },
      onStompError: (err) => console.error("STOMP error:", err),
    });

    client.activate();
    stompRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  const handleSend = async (content) => {
    if (!selectedFriend) return;

    let receiverUsername = "";
    let result = "";

    if (
      selectedFriend.nickname === "embeddedAIByConnectee" &&
      selectedFriend.nickname === "embeddedAIByConnectee"
    ) {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_URL}/api/ai/generate?prompt=` +
            encodeURIComponent(content),
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          result = res.data;
        }

        let resultObj = {
          nickname: myNick,
          prompt: content,
          result: result,
          timestamp: Date.now(),
        };
        setAiChatMess((prev) => [...prev, resultObj]);
        setLoading(false);
      } catch (error) {
        console.error("Failed to send ai prompt", error);
      }
    } else {
      try {
        const res = await axios.get(
          `${API_URL}/api/user/get-username-by-nickname?nickname=` +
            selectedFriend.nickname
        );

        if (res.status === 200) {
          receiverUsername = res.data;
        }
      } catch (error) {
        console.error("Failed to fetch nickname", error);
      }

      const chatMessage = {
        receiver: receiverUsername,
        content,
      };

      setMessages((prev) => [
        ...prev,
        {
          sender: myNick.current,
          receiver: selectedFriend.nickname,
          timestamp: Date.now(),
          content,
        },
      ]);

      stompRef.current?.publish({
        destination: "/app/chat.private",
        body: JSON.stringify(chatMessage),
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Hidden on mobile, toggle with hamburger */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 md:w-80 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:flex md:flex-col md:border-r ${
          scrMode === "dark"
            ? "bg-gray-900 text-white border-gray-700"
            : "bg-white text-black border-gray-300"
        }`}
      >
        <Sidebar
          onSelectFriend={handleSelectFriend}
          onlineFriend={onlineMap}
          selectedFriend={selectedFriend}
          lang={lang}
          scrMode={scrMode}
        />
      </div>

      {/* Hamburger Button for Mobile */}
      {!isSidebarOpen && (
        <button
          className="md:hidden fixed top-12 left-4 z-50 text-blue-600 focus:outline-none"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      )}

      {/* Chat Area */}
      <div
        id="chatArea"
        className="flex-1 flex flex-col"
        style={{ backgroundColor: scrMode === "dark" && "#1f2937" }}
      >
        <ChatHeader friend={selectedFriend} lang={lang} scrMode={scrMode} />
        <ChatBody
          friend={selectedFriend}
          messages={messages}
          aiMess={aiChatMess}
          onAiMess={setAiChatMess}
          loading={loading}
          setLoading={setLoading}
          lang={lang}
          scrMode={scrMode}
        />
        <MessageInput
          friend={selectedFriend}
          onSendMessage={handleSend}
          loading={loading}
          setLoading={setLoading}
          lang={lang}
          scrMode={scrMode}
        />
      </div>

      {/* Overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
