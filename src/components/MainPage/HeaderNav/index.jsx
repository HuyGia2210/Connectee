import { useState } from "react";
import FeatureDropdown from "../FeatureDropdown";
import logo from "../../../images/logo3.png"

export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="relative z-50 bg-transparent shadow-sm px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-1">
        <img
          src={logo}
          alt="Messenger Logo"
          className="w-18 h-15"
        />
        <span className="text-xl font-bold text-blue-600">Connectee</span>
      </div>

      {/* Nav links */}
      <nav className="flex items-center space-x-8 font-semibold text-sm relative">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600"
          >
            Tính năng
            <span className="ml-1">{isOpen ? "▲" : "▼"}</span>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute left-0 top-full mt-2">
              <FeatureDropdown />
            </div>
          )}
        </div>

        <a href="#" className="hover:text-blue-600">
          Quyền riêng tư và an toàn
        </a>
        <a href="#" className="hover:text-blue-600">
          Ứng dụng dành cho máy tính
        </a>
        <a href="#" className="hover:text-blue-600">
          Dành cho nhà phát triển
        </a>
        <a href="#" className="hover:text-blue-600">
          Trung tâm trợ giúp
        </a>
      </nav>
    </header>
  );
}
