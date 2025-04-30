// src/assets/components/LoginForm/index.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Dùng axios để gọi API

export default function LoginForm({ onSwitchToSignup }) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState(""); // Lưu username
  const [password, setPassword] = useState(""); // Lưu password
  const [error, setError] = useState(""); // Lưu lỗi nếu có

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/login",
        { username, password },
        { withCredentials: true } // QUAN TRỌNG: để browser tự nhận cookie HttpOnly
      );

      if (response.status === 200) {
        const nickResp = await axios.get(
          "http://localhost:8080/api/user/get-nickname",
          { withCredentials: true }
        );

        if (nickResp.status === 200) {
          const nickname = nickResp.data;
          localStorage.setItem("nickname", nickname);
        }
        
        navigate("/chat"); // Đăng nhập thành công -> sang /chat
      }
    } catch (err) {
      console.error(err);
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
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
        <div className="flex justify-between items-center text-sm text-gray-600">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="accent-blue-500"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <span>Đăng nhập với tư cách quản lý</span>
          </label>
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
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
        >
          Đăng nhập
        </button>
      </form>

      {/* Quên mật khẩu */}
      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-blue-600 hover:underline">
          Bạn quên mật khẩu?
        </a>
      </div>
    </div>
  );
}
