import logo from "../../../images/logo3.png";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center text-sm text-gray-600 px-4 sm:px-8 py-6 border-t space-y-4 md:flex-row md:justify-between md:space-y-0">
      {/* Left side: copyright + links */}
      <div className="flex flex-col items-center space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <span>© Connectee 2025</span>
        <div className="flex flex-wrap justify-center space-x-4">
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
      </div>

      <div className="flex items-center space-x-2">
        <span>from</span>
        <img src={logo} alt="Messenger Logo" className="w-8 h-8 rounded-full" />
      </div>
    </footer>
  );
}

