import React from 'react';

function Sidebar() {
  return (
    <div className="w-64 bg-gray-200 p-4">
      <div className="flex items-center mb-6">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="font-semibold">Amanda</p>
          <a href="#" className="text-blue-500 text-sm">Xem hồ sơ</a>
        </div>
      </div>
      <ul className="space-y-2">
        <li><a href="#" className="text-gray-700 hover:text-blue-500">Cài đặt người dùng</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-500">Bảo mật & Quyền riêng tư</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-500">Thông báo</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-500">Giao diện</a></li>
        <li><a href="#" className="text-gray-700 hover:text-blue-500">Đăng xuất</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;