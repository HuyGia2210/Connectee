import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import axios from "axios";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/stat/get-all-app-user")
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
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="py-3 px-4 text-left">Mã tài khoản</th>
              <th className="py-3 px-4 text-left">Họ và tên</th>
              <th className="py-3 px-4 text-left">Biệt danh</th>
              <th className="py-3 px-4 text-left">Ngày sinh</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Giới tính</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-3 px-4">{user.accId}</td>
                <td className="py-3 px-4">{user.fullName}</td>
                <td className="py-3 px-4">{user.nickname}</td>
                <td className="py-3 px-4">
                  {user.dob
                    ? new Date(user.dob).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })
                    : ""}
                </td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
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
