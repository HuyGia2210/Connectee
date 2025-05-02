import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import PublicRoute from "./components/MainPage/PublicRoute";
import ProtectedRoute from "./components/MainPage/ProtectedRoute";
import ChatPage from "./components/Chat/ChatPage";
import AuthPage from "./components/MainPage/AuthPage";
import AdminPage from "./components/Admin/AdminPage";
import ErrorPage from "./components/ErrorPage";
import SettingsPage from "./components/Settings/SettingsPage"; // Thêm SettingsPage
import { useState } from "react";

export default function App() {
  const location = useLocation();
  const isFullScreen = location.pathname === "/chat" || location.pathname === "/admin" || location.pathname === "/settings";

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

        {/* Đường dẫn private cho settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* Đường dẫn lỗi */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}