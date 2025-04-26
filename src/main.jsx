import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import AuthPage from './components/MainPage/AuthPage/index';
import ChatPage from './components/Chat/ChatPage/index';
import AdminPage from './components/Admin/AdminPage/index'; // Thêm import AdminPage
import ErrorPage from './components/ErrorPage/index';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/admin" element={<AdminPage />} /> {/* Thêm route cho trang quản lý */}
        <Route path="*" element={<ErrorPage />} /> {/* Thêm route lỗi */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);