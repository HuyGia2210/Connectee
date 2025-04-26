import { Routes, Route } from "react-router-dom";
import ChatPage from "./assets/components/ChatPage";
import AuthPage from "./assets/components/AuthPage";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import PublicRoute from "./assets/components/PublicRoute";
import "./App.css";

export default function App() {
  return (
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
    </Routes>
  );
}
