import { useEffect, useState } from "react";
import StatCard from "../StatCard";
import axios from "axios";

export default function StatisticsSection() {
  const [userCount, setUserCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [onlineUserCount, setOnlineUserCount] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/api/stat/get-number-of-app-user`)
      .then(res => setUserCount(res.data))
      .catch(err => console.error("Error fetching user count", err));

    axios.get(`${API_URL}/api/stat/get-number-of-messages`)
      .then(res => setMessageCount(res.data))
      .catch(err => console.error("Error fetching message count", err));

    axios.get(`${API_URL}/api/stat/get-number-of-online-user`)
      .then(res => setOnlineUserCount(res.data))
      .catch(err => console.error("Error fetching online user count", err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      <StatCard
        title="Tổng số lượng người dùng"
        value={userCount}
        textColor="text-blue-600"
      />
      <StatCard
        title="Tổng số tin nhắn được lưu"
        value={messageCount.toLocaleString()}
        textColor="text-red-500"
      />
      <StatCard
        title="Tổng số người dùng đang trực tuyến"
        value={onlineUserCount}
        textColor="text-green-500"
      />
    </div>
  );
}
