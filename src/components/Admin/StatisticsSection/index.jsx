import { useEffect, useState } from "react";
import StatCard from "../StatCard";
import axios from "axios";

export default function StatisticsSection() {
  const [userCount, setUserCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [onlineUserCount, setOnlineUserCount] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8080/api/stat/get-number-of-app-user")
      .then(res => setUserCount(res.data))
      .catch(err => console.error("Error fetching user count", err));

    axios.get("http://localhost:8080/api/stat/get-number-of-messages")
      .then(res => setMessageCount(res.data))
      .catch(err => console.error("Error fetching message count", err));

    axios.get("http://localhost:8080/api/stat/get-number-of-online-user")
      .then(res => setOnlineUserCount(res.data))
      .catch(err => console.error("Error fetching online user count", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard
        title="Tổng số lượng người dùng"
        value={userCount}
        change="+15%" // bạn có thể tính % nếu muốn
        textColor="text-blue-500"
        changeColor="text-green-500"
      />
      <StatCard
        title="Tổng số tin nhắn được lưu"
        value={messageCount.toLocaleString()}
        change="-8.5%" // placeholder
        textColor="text-red-400"
        changeColor="text-red-500"
      />
      <StatCard
        title="Tổng số người dùng đang trực tuyến"
        value={onlineUserCount}
        change="-85.5%" // placeholder
        textColor="text-green-500"
        changeColor="text-red-500"
      />
    </div>
  );
}
