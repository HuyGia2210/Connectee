export default function LoginForm() {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <form className="space-y-4">
        {/* Email or Phone */}
        <div>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nhập email hoặc số điện thoại"
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

        {/* Checkbox + Quên mật khẩu */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-blue-500" />
            <span>Duy trì đăng nhập</span>
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Bạn quên mật khẩu?
          </a>
        </div>

        {/* Đăng nhập button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
        >
          Đăng nhập
        </button>
      </form>

      {/* Tải xuống app */}
      <div className="mt-6 text-center text-gray-600 text-sm">
        <p>Tải ứng dụng Connectee dành cho máy tính</p>
        <div className="flex justify-center space-x-4 mt-4">
          <img
            src="/appstore.png"
            alt="Tải xuống từ App Store"
            className="h-10"
          />
          <img
            src="/microsoftstore.png"
            alt="Tải xuống từ Microsoft Store"
            className="h-10"
          />
        </div>
      </div>
    </div>
  );
}
