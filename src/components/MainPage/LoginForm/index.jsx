// src/assets/components/LoginForm/index.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Thêm useState để quản lý trạng thái checkbox

export default function LoginForm({ onSwitchToSignup }) {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false); // State để theo dõi checkbox

  const handleLogin = (e) => {
    e.preventDefault();
    // Thêm logic xác thực nếu cần (gọi API, kiểm tra input, v.v.)
    if (isAdmin) {
      navigate("/admin"); // Chuyển hướng đến trang quản lý nếu checkbox được tích
    } else {
      navigate("/chat"); // Chuyển hướng đến trang chat nếu không tích
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
          />
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập mật khẩu"
          />
        </div>

        {/* Checkbox + Đăng ký */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="accent-blue-500"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)} // Cập nhật state khi checkbox thay đổi
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
