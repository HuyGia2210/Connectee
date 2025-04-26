export default function SignUpForm({ onBack }) {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Họ"
            className="px-4 py-2 border rounded-md w-full"
          />
          <input
            type="text"
            placeholder="Tên"
            className="px-4 py-2 border rounded-md w-full"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <select className="px-4 py-2 border rounded-md">
            <option>Ngày</option>
            {/* Các option ngày */}
          </select>
          <select className="px-4 py-2 border rounded-md">
            <option>Tháng</option>
            {/* Các option tháng */}
          </select>
          <select className="px-4 py-2 border rounded-md">
            <option>Năm</option>
            {/* Các option năm */}
          </select>
        </div>

        <select className="w-full px-4 py-2 border rounded-md">
          <option>Chọn giới tính</option>
          <option>Nam</option>
          <option>Nữ</option>
          <option>Khác</option>
        </select>

        <input
          type="text"
          placeholder="Số điện thoại hoặc email"
          className="w-full px-4 py-2 border rounded-md"
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full px-4 py-2 border rounded-md"
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
        >
          Gửi
        </button>
      </form>

      <button
        onClick={onBack}
        className="w-full mt-4 border text-blue-600 border-gray-300 py-2 rounded-md hover:bg-gray-50"
      >
        Tôi có tài khoản rồi
      </button>
    </div>
  );
}
