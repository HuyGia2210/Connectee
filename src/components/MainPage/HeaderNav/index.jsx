import { useState } from "react";
import FeatureDropdown from "../FeatureDropdown";
import logo from "../../../images/logo3.png";

export default function HeaderNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative z-50 bg-white shadow-sm px-4 sm:px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Messenger Logo"
          className="w-12 h-12 sm:w-16 sm:h-16"
        />
        <span className="text-lg sm:text-xl font-bold text-blue-600">Connectee</span>
      </div>

      {/* Nav links - Desktop */}
      <nav className="hidden md:flex items-center space-x-6 font-semibold text-sm">
        <a href="#" className="hover:text-blue-600 transition-colors">
          Quyền riêng tư và an toàn
        </a>
        <a href="#" className="hover:text-blue-600 transition-colors">
          Ứng dụng dành cho máy tính
        </a>
        <a href="#" className="hover:text-blue-600 transition-colors">
          Dành cho nhà phát triển
        </a>
        <a href="#" className="hover:text-blue-600 transition-colors">
          Trung tâm trợ giúp
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-blue-600 focus:outline-none"
        aria-label="Toggle menu"
        onClick={toggleMenu}
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

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-blue-600 focus:outline-none"
            aria-label="Close menu"
            onClick={toggleMenu}
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <nav className="flex flex-col space-y-4 px-6 py-4 font-semibold text-sm">
          <a
            href="#"
            className="hover:text-blue-600 transition-colors"
            onClick={toggleMenu}
          >
            Quyền riêng tư và an toàn
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition-colors"
            onClick={toggleMenu}
          >
            Ứng dụng dành cho máy tính
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition-colors"
            onClick={toggleMenu}
          >
            Dành cho nhà phát triển
          </a>
          <a
            href="#"
            className="hover:text-blue-600 transition-colors"
            onClick={toggleMenu}
          >
            Trung tâm trợ giúp
          </a>
        </nav>
      </div>

      {/* Overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
}

