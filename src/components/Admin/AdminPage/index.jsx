import { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import StatisticsSection from "../StatisticsSection";
import UserTable from "../UserTable";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [canCreateAdmin, setCanCreateAdmin] = useState(false); // Trạng thái cho phép tạo tài khoản admin
  const [newAdminUsername, setNewAdminUsername] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Kiểm tra nếu trước đó đã đăng nhập admin
    const loggedIn = localStorage.getItem("admin_logged_in");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      setCanCreateAdmin(false); // Ban đầu không cho phép tạo admin
    }
  }, []);

  const handleLogin = async () => {
    // Kiểm tra đăng nhập, nếu username là "admin" và password là "admin123", cho phép tạo tài khoản admin
    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/check-valid-admin-acc?username=${username}&password=${password}`
      );
      const data = await response.json();
      if (data) {
        localStorage.setItem("admin_logged_in", "true");
        setIsLoggedIn(true);
        setCanCreateAdmin(true); // Sau khi login, cho phép tạo tài khoản admin
        setErrorMessage(""); // Reset error message
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
    setCanCreateAdmin(false); // Reset quyền tạo admin khi logout
  };

  const handleCreateAdmin = async () => {
    if (newAdminUsername && newAdminPassword) {
      try {
        const res = await fetch(
          `http://localhost:8080/api/admin/add-admin?username=${newAdminUsername}&password=${newAdminPassword}`,
          { method: "GET" }
        );

        if (res.ok) {
          alert("Tạo tài khoản admin thành công!");
          // Sau khi tạo thành công, logout để xóa tài khoản admin mặc định
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
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center">Connectee</h2>
          <h2 className="text-lg font-bold mb-4 text-center">
            Đăng nhập quyền quản trị viên
          </h2>
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full p-2 mb-3 border border-gray-300 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
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
    <div className="h-screen flex">
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Quản lý người dùng</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            >
              Đăng xuất
            </button>
          </div>
          <StatisticsSection />
          <UserTable />
          <div className="mt-6">
            <h3 className="text-lg font-semibold">Tạo tài khoản Admin mới</h3>
            <input
              type="text"
              placeholder="Tên đăng nhập mới"
              className="w-full p-2 mb-3 border border-gray-300 rounded"
              value={newAdminUsername}
              onChange={(e) => setNewAdminUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu mới"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={newAdminPassword}
              onChange={(e) => setNewAdminPassword(e.target.value)}
            />
            <button
              onClick={handleCreateAdmin}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Tạo tài khoản Admin
            </button>
            {errorMessage && (
              <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
