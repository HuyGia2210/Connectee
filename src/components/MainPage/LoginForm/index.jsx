import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function LoginForm({ onSwitchToSignup }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/user/login`,
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const nickResp = await axios.get(`${API_URL}/api/user/get-nickname`, {
          withCredentials: true,
        });

        if (nickResp.status === 200) {
          const nickname = nickResp.data;
          localStorage.setItem("nickname", nickname);
        }

        navigate("/chat");
      }
    } catch (err) {
      console.error(err);
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-md mx-auto">
      <form className="space-y-4" onSubmit={handleLogin}>
        {/* Email or Phone */}
        <div>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Checkbox + Đăng ký */}
        <div className="flex justify-end items-center text-sm text-gray-600">
          <span className="text-blue-600 mr-2">Chưa có tài khoản?</span>
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="text-blue-600 hover:underline"
          >
            Đăng ký
          </button>
        </div>

        {/* Thông báo lỗi nếu có */}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        {/* Đăng nhập button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 text-white font-semibold rounded-md ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}
