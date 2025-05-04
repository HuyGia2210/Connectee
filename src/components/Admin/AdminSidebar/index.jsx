export default function AdminSidebar() {
    return (
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Navigation */}
        <div className="p-4 space-y-2">
          <div className="flex items-center space-x-2 p-2 bg-blue-100 rounded-md">
            <i className="ri-dashboard-line text-blue-600"></i>
            <span className="font-medium text-blue-600">Dashboard</span>
          </div>
          <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <i className="ri-user-line text-gray-600"></i>
            <span className="text-gray-600">User Management</span>
          </div>
          <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <i className="ri-message-line text-gray-600"></i>
            <span className="text-gray-600">Message Management</span>
          </div>
          <div className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <i className="ri-settings-line text-gray-600"></i>
            <span className="text-gray-600">Settings</span>
          </div>
        </div>
  
        {/* Footer */}
        <div className="mt-auto p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">👤</span>
            </div>
            <div>
              <div className="font-medium">Amanda</div>
              <button className="text-sm text-blue-600 hover:underline">
                View profile
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }