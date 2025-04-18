// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 px-8 py-6 border-t space-y-2 md:space-y-0">
      {/* Left side: copyright + links */}
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-1 md:space-y-0">
        <span>© Connectee 2025</span>
        <a href="#" className="hover:underline">Chính sách quyền riêng tư</a>
        <a href="#" className="hover:underline">Chính sách cookie</a>
        <a href="#" className="hover:underline">Điều khoản</a>
        <a href="#" className="hover:underline">Tiếng Việt ▾</a>
      </div>

      {/* Right side: Meta logo */}
      <div className="flex items-center space-x-1">
        <span>from</span>
        <img
          src="/meta-logo.svg"
          alt="Meta Logo"
          className="h-5"
        />
      </div>
    </footer>
  );
}
