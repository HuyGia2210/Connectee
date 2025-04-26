// src/assets/components/UserTable/index.jsx
import { useState } from "react";
import Pagination from "../Pagination";

export default function UserTable() {
  // Dữ liệu người dùng (50 người dùng)
  const users = Array.from({ length: 50 }, (_, index) => ({
    id: String(index + 1).padStart(3, "0"), // Tạo ID dạng 001, 002, ..., 050
    name: `Người Dùng ${index + 1}`,
    email: `nguoidung${index + 1}@example.com`,
    date: `2023-${String((index % 12) + 1).padStart(2, "0")}-${String((index % 28) + 1).padStart(2, "0")}`,
    status: index % 2 === 0 ? "Hoạt động" : "Bị chặn",
    statusAction: index % 2 === 0 ? "Block" : "Activate",
  }));

  // State để theo dõi trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Số người dùng mỗi trang

  // Tính toán dữ liệu cho trang hiện tại
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Tổng số trang
  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-600 text-sm">
              <th className="py-3 px-4 text-left">User ID</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Registration Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
              <th className="py-3 px-4 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-3 px-4">{user.id}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.date}</td>
                <td className="py-3 px-4">{user.status}</td>
                <td className="py-3 px-4">
                  <button
                    className={`px-3 py-1 rounded-full text-sm ${
                      user.statusAction === "Block" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                    }`}
                  >
                    {user.statusAction === "Block" ? (
                      <span className="flex items-center">
                        <i className="ri-forbid-line mr-1"></i> Block
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <i className="ri-check-line mr-1"></i> Activate
                      </span>
                    )}
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Truyền props cho Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}