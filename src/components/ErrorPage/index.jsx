// src/assets/components/ErrorPage/index.jsx
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        {/* Tiêu đề lỗi */}
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-600">
          Trang không tồn tại
        </h2>

        {/* Thông điệp */}
        <p className="text-gray-500">
          Có vẻ bạn đã đi lạc! Trang bạn tìm kiếm không tồn tại.
        </p>

        {/* Icon minh họa */}
        <div className="text-gray-400">
          <i className="ri-error-warning-line text-8xl"></i>
        </div>

        {/* Nút quay lại */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Quay lại trang chủ
        </button>
      </div>
    </div>
  );
}