export default function ChatHeader() {
    return (
      <div className="px-6 py-3 border-b border-gray-300 bg-white flex items-center justify-between">
        <div>
          <div className="font-semibold">David Moore</div>
          <div className="text-sm text-gray-500">last seen 5 mins ago</div>
        </div>
        <div className="flex items-center space-x-4 text-gray-600">
          <i className="ri-search-line"></i>
          <i className="ri-phone-line"></i>
          <i className="ri-more-2-fill"></i>
        </div>
      </div>
    );
  }