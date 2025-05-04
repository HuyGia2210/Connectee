// src/components/Chat/ChatPage.jsx
import Sidebar from "../Sidebar";
import ChatHeader from "../ChatHeader";
import ChatBody from "../ChatBody";
import MessageInput from "../MessageInput";
import { useState, useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";
import axios from "axios"; // Dùng axios để gọi API

export default function ChatPage({ lang, scrMode }) {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [aiChatMess, setAiChatMess] = useState([]);
  const [loading, setLoading] = useState(false);
  const [onlineMap, setOnlineMap] = useState({});
  const stompRef = useRef(null);
  const myNick = useRef(localStorage.getItem("nickname"));

  const handleSelectFriend = (f) => {
    setSelectedFriend(f);
    setMessages([]);
  };

  const getOnlineFriend = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/user/get-online-friends-by-nickname?nickname=" +
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

  // 1. WebSocket chỉ kết nối 1 lần và nhận tin nhắn sau đó hiện lên theo thời gian thực
  useEffect(() => {
    if (!myNick.current) return console.error("No nickname in localStorage");

    const client = new Client({
      brokerURL: `ws://localhost:8080/ws?nickname=${myNick.current}`,
      connectHeaders: {},
      debug: (str) => console.log(str),
      onConnect: () => {

        client.subscribe("/user/queue/messages", async (message) => {
          const msg = JSON.parse(message.body);

          try {
            // Gọi API để lấy nickname từ username của sender
            const res = await axios.get(
              "http://localhost:8080/api/user/get-nickname-by-username?username=" +
                msg.receiver
            );

            if (res.status === 200) {
              // Thay sender bằng nickname đã lấy được
              msg.receiver = res.data;
            }
          } catch (error) {
            console.error("Failed to fetch nickname", error);
          }

          try {
            // Gọi API để lấy nickname từ username của sender
            const res = await axios.get(
              "http://localhost:8080/api/user/get-nickname-by-username?username=" +
                msg.sender
            );

            if (res.status === 200) {
              // Thay sender bằng nickname đã lấy được
              msg.sender = res.data;
            }
          } catch (error) {
            console.error("Failed to fetch nickname", error);
          }

          const newMsg = {
            ...msg,
            timestamp: Date.now(),
          };

          // thêm vào danh sách messages chung (không filter)
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

  //Gửi tin nhắn đi sau đó hiện tin nhắn lên UI
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
          "http://localhost:8080/api/ai/generate?prompt=" +
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
        // Gọi API để lấy nickname từ username của sender
        const res = await axios.get(
          "http://localhost:8080/api/user/get-username-by-nickname?nickname=" +
            selectedFriend.nickname
        );

        if (res.status === 200) {
          // Thay sender bằng nickname đã lấy được
          receiverUsername = res.data;
        }
      } catch (error) {
        console.error("Failed to fetch nickname", error);
      }

      const chatMessage = {
        receiver: receiverUsername,
        content,
      };


      // Echo ngay cho UI
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
    <div className="flex">
      <Sidebar
        onSelectFriend={handleSelectFriend}
        onlineFriend={onlineMap}
        selectedFriend={selectedFriend}
        lang={lang}
        scrMode={scrMode}
      />
      <div id="chatArea" className="flex-1 flex flex-col" style={{backgroundColor: scrMode !== "light" && "#1f2937"}}>
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
    </div>
  );
}
