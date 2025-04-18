// src/components/HeaderNav.jsx

export default function HeaderNav() {
  return (
    <header className="flex justify-between items-center px-8 py-4 border-b">
      {/* Logo Messenger */}
      <div className="flex items-center space-x-2">
        <img
          src="/logo-messenger.svg"
          alt="Messenger Logo"
          className="w-6 h-6"
        />
      </div>

      {/* Menu items */}
      <nav className="hidden md:flex space-x-6 text-sm text-gray-700 font-medium">
        <a href="#" className="hover:text-blue-600">Tính năng ▾</a>
        <a href="#" className="hover:text-blue-600">Quyền riêng tư và an toàn</a>
        <a href="#" className="hover:text-blue-600">Ứng dụng dành cho máy tính</a>
        <a href="#" className="hover:text-blue-600">Dành cho nhà phát triển</a>
        <a href="#" className="hover:text-blue-600">Trung tâm trợ giúp</a>
      </nav>
    </header>
  );
}
