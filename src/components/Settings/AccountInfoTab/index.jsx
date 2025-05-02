import React from 'react';

function AccountInfoTab() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Thông tin tài khoản</h3>
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full mr-2"
          />
          <div>
            <p className="font-semibold">James Smith</p>
            <p className="text-gray-600">james.smith@gmail.com</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Số điện thoại</h3>
        <p className="text-gray-600 mb-2">Chưa cung cấp</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Thêm mới
        </button>
      </div>
    </div>
  );
}

export default AccountInfoTab;