import { useRef, useState } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "./App.css";

function App() {
  const [isVisible, setVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);
  
  const usernameRef = useRef(null);

  // Kết nối WebSocket
  function connect(e) {
    e.preventDefault();
    const enteredUsername = usernameRef.current.value.trim();
    if (!enteredUsername) return;

    setUsername(enteredUsername);
    setVisible(true);

    const socket = new SockJS("http://localhost:8080/ws");

    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000, // Tự động kết nối lại
      onConnect: () => {
        console.log("✅ Connected to WebSocket");

        // Đăng ký nhận tin nhắn
        stompClient.subscribe("/topic/public", (msg) => {
          const receivedMessage = JSON.parse(msg.body);
          if(receivedMessage.type === "JOIN"){
            receivedMessage.content = receivedMessage.sender + " joined!"
          }else if(receivedMessage.type === "LEAVE"){
            receivedMessage.content = receivedMessage.sender + " left!"
          }else
          setMessages((prev) => [...prev, receivedMessage]);
        });

        // Gửi thông báo user đã tham gia
        stompClient.publish({
          destination: "/app/chat.addUser",
          body: JSON.stringify({ sender: enteredUsername, type: "JOIN"}),
        });
      },
      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);
  }

  // Gửi tin nhắn
  function sendMessage() {
    if (client && message.trim() !== "") {
      var chatMessage={sender: username, content: message, type: "CHAT"}
      client.publish({
        destination: "/app/chat.sendMessage",
        body: JSON.stringify(chatMessage),
      });
      setMessage(""); // Xóa input sau khi gửi
    }
  }

  return (
    <div className="p-4">
      {isVisible == false && (
        <div id="usernamePage">
          <h3>Nhập Username</h3>
          <form onSubmit={connect}>
            <input
              ref={usernameRef}
              type="text"
              className="border-2 border-white rounded-md p-2"
              placeholder="Nhập username"
            />
            <button type="submit" className="ml-4 border-2 border-white rounded-lg h-10 w-20 hover:bg-sky-700">
              Submit
            </button>
          </form>
        </div>
      )}

      {isVisible == true && (
        <div id="chatPage" className="border-2 rounded-lg p-4">
          <h3>Chat Room</h3>
          <ul className="border p-2 h-60 overflow-auto">
            {messages.map((msg, index) => (
              <li key={index} className="border-b p-1">
                <strong>{msg.sender}:</strong> {msg.content}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-2 border-white rounded-md p-2 flex-1"
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={sendMessage} className="ml-4 border-2 border-white rounded-lg h-10 w-20 hover:bg-sky-700">
              Gửi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
