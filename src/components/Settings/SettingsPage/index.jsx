import { useState } from 'react';
import Sidebar from '../SecondSideBar'; // Import Sidebar từ thư mục components
import MainContent from '../MainContent';

function SettingsPage() {
  const [activeTab, setActiveTab] = useState('accountInfo');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex space-x-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('accountInfo')}
              className={`pb-2 ${activeTab === 'accountInfo' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              Thông tin tài khoản
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`pb-2 ${activeTab === 'security' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              Bảo mật
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`pb-2 ${activeTab === 'notifications' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              Thông báo
            </button>
            <button
              onClick={() => setActiveTab('connectedApps')}
              className={`pb-2 ${activeTab === 'connectedApps' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            >
              Ứng dụng đã kết nối
            </button>
          </div>
          <MainContent activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;