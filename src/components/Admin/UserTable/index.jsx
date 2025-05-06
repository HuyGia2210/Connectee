import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import axios from "axios";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API_URL}/api/stat/get-all-app-user`)
      .then((res) => setUsers(res.data))
      .catch((err) =>
        console.error("Lỗi khi fetch danh sách người dùng:", err)
      );
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-xs sm:text-sm font-semibold">
              <th className="py-3 px-3 sm:px-4 text-left min-w-[100px]">Mã tài khoản</th>
              <th className="py-3 px-3 sm:px-4 text-left min-w-[120px]">Họ và tên</th>
              <th className="py-3 px-3 sm:px-4 text-left min-w-[100px]">Biệt danh</th>
              <th className="py-3 px-3 sm:px-4 text-left min-w-[100px]">Ngày sinh</th>
              <th className="py-3 px-3 sm:px-4 text-left min-w-[150px]">Email</th>
              <th className="py-3 px-3 sm:px-4 text-left min-w-[80px]">Giới tính</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50 transition duration-200">
                <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm">{user.accId}</td>
                <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm">{user.fullName}</td>
                <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm">{user.nickname}</td>
                <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm">
                  {user.dob
                    ? new Date(user.dob).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : ""}
                </td>
                <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm">{user.email}</td>
                <td className="py-3 px-3 sm:px-4 text-xs sm:text-sm">
                  {user.gender === "MALE"
                    ? "Nam"
                    : user.gender === "FEMALE"
                    ? "Nữ"
                    : "Khác"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
