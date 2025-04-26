// src/assets/components/AdminHeader/index.jsx
export default function AdminHeader() {
    return (
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <span className="text-xl font-semibold text-blue-600">Connectee</span>
          <div className="flex space-x-2">
            <button className="text-gray-600 font-medium hover:text-blue-600">Dashboard</button>
            <button className="text-gray-600 hover:text-blue-600">Settings</button>
            <button className="text-gray-600 hover:text-blue-600">Help</button>
          </div>
        </div>
  
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
        </div>
  
        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">👤</span>
        </div>
      </div>
    );
  }