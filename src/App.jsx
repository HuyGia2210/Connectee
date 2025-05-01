// src/App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import PublicRoute from "./components/MainPage/PublicRoute";
import ProtectedRoute from "./components/MainPage/ProtectedRoute";
import ChatPage from "./components/Chat/ChatPage";
import AuthPage from "./components/MainPage/AuthPage";
import AdminPage from "./components/Admin/AdminPage"; // Thêm AdminPage
import ErrorPage from "./components/ErrorPage"; // Thêm ErrorPage
import { useState } from "react";

export default function App() {
  const location = useLocation();
  const isFullScreen = location.pathname === "/chat" || location.pathname === "/admin";

  const [lang, setLang] = useState("vn");

  const toggleLanguage = () => {
    setLang((prevLang) => (prevLang === "VN" ? "EN" : "VN"));
  };

  return (
    <div id="root" className={isFullScreen ? "full-screen" : ""}>
      <Routes>
        {/* Đường dẫn public */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        {/* Đường dẫn private */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        {/* Đường dẫn private cho admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        {/* Đường dẫn lỗi */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

