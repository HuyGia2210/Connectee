// src/assets/components/ChatHeader/index.jsx
export default function ChatHeader() {
  return (
    <div className="px-6 py-3 border-b border-gray-300 bg-white flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">👤</span>
        </div>
        <div>
          <div className="font-semibold">David Moore</div>
          <div className="text-sm text-gray-500">last seen 5 mins ago</div>
        </div>
      </div>
      <div className="flex items-center space-x-4 text-gray-600">
        <i className="ri-search-line text-xl hover:text-blue-600 cursor-pointer"></i>
        <i className="ri-more-2-fill text-xl hover:text-blue-600 cursor-pointer"></i>
      </div>
    </div>
  );
}