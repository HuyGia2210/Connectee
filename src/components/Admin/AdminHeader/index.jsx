export default function AdminHeader({ toggleSidebar, isSidebarOpen }) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-md">
      {/* Hamburger Button */}
      {!isSidebarOpen && (
        <button
          className="md:hidden text-blue-600 focus:outline-none mr-4"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      )}
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <span className="text-2xl font-bold text-blue-600">Connectee</span>
      </div>
    </div>
  );
}
