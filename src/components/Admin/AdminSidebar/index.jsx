export default function AdminSidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen shadow-lg">
      {/* Navigation */}
      <div className="p-6 space-y-3">
        <div className="flex items-center space-x-3 p-3 bg-blue-600 text-white rounded-lg shadow-md">
          <i className="ri-dashboard-line text-lg"></i>
          <span className="font-semibold text-lg">Dashboard</span>
        </div>
        <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition duration-200">
          <i className="ri-user-line text-gray-600 text-lg"></i>
          <span className="text-gray-600 font-medium">User Management</span>
        </div>
        <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition duration-200">
          <i className="ri-message-line text-gray-600 text-lg"></i>
          <span className="text-gray-600 font-medium">Message Management</span>
        </div>
        <div className="flex items-center space-x-3 p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition duration-200">
          <i className="ri-settings-line text-gray-600 text-lg"></i>
          <span className="text-gray-600 font-medium">Settings</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center shadow-sm">
            <span className="text-gray-500 text-lg">👤</span>
          </div>
          <div>
            <div className="font-semibold text-gray-800">Amanda</div>
            <button className="text-sm text-blue-600 hover:underline">
              View profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
