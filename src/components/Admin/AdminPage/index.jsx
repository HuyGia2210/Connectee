import { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";
import StatisticsSection from "../StatisticsSection";
import UserTable from "../UserTable";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [canCreateAdmin, setCanCreateAdmin] = useState(false);
  const [newAdminUsername, setNewAdminUsername] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("admin_logged_in");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      setCanCreateAdmin(false);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/admin/check-valid-admin-acc?username=${username}&password=${password}`
      );
      const data = await response.json();
      if (data) {
        localStorage.setItem("admin_logged_in", "true");
        setIsLoggedIn(true);
        setCanCreateAdmin(true);
        setErrorMessage("");
      } else {
        setErrorMessage("Tên đăng nhập hoặc mật khẩu không đúng.");
      }
    } catch (error) {
      setErrorMessage("Lỗi kết nối với server.", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    setIsLoggedIn(false);
    setCanCreateAdmin(false);
  };

  const handleCreateAdmin = async () => {
    if (newAdminUsername && newAdminPassword) {
      try {
        const res = await fetch(
          `${API_URL}/api/admin/add-admin?username=${newAdminUsername}&password=${newAdminPassword}`,
          { method: "GET" }
        );

        if (res.ok) {
          alert("Tạo tài khoản admin thành công!");
          handleLogout();
        } else {
          setErrorMessage(
            "Không thể tạo tài khoản admin, có thể trùng tên đăng nhập."
          );
        }
      } catch (error) {
        setErrorMessage("Lỗi khi tạo tài khoản admin.", error);
      }
    } else {
      setErrorMessage("Vui lòng nhập đủ thông tin.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="bg-white shadow-2xl rounded-lg p-6 w-full max-w-xs sm:max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Connectee</h2>
          <h2 className="text-lg font-semibold mb-4 text-center">
            Đăng nhập quyền quản trị viên
          </h2>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Đăng nhập
          </button>
          {errorMessage && (
            <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:static md:flex md:flex-col md:border-r bg-white border-gray-200 shadow-lg`}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <AdminHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <div className="p-4 sm:p-6 space-y-6 bg-gray-100 flex-1 overflow-y-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Quản lý người dùng</h1>
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-1 sm:py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Đăng xuất
            </button>
          </div>
          <StatisticsSection />
          <UserTable />
          <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm mx-auto md:max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tạo tài khoản Admin mới</h3>
            <input
              type="text"
              placeholder="Tên đăng nhập mới"
              className="w-full p-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newAdminUsername}
              onChange={(e) => setNewAdminUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
            />
            <button
              onClick={handleCreateAdmin}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
            >
              Tạo tài khoản Admin
            </button>
            {errorMessage && (
              <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
