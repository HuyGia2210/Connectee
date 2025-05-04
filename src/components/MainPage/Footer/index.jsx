// src/components/Footer.jsx
import logo from "../../../images/logo3.png";

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 px-8 py-6 border-t space-y-2 md:space-y-0">
      {/* Left side: copyright + links */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-1 md:space-y-0">
        <span>© Connectee 2025</span>
        <a href="#" className="hover:underline">
          Chính sách quyền riêng tư
        </a>
        <a href="#" className="hover:underline">
          Chính sách cookie
        </a>
        <a href="#" className="hover:underline">
          Điều khoản
        </a>
      </div>

      <div className="flex items-center space-x-2 rounded-full">
        <span>from</span>
        <img src={logo} alt="Messenger Logo" className="w-10 h-8 rounded-full" />
      </div>
    </footer>
  );
}
