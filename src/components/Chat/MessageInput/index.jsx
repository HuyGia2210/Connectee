// src/assets/components/MessageInput/index.jsx
export default function MessageInput() {
  return (
    <div className="px-6 py-4 border-t bg-white flex items-center space-x-4">
      <input
        type="text"
        placeholder="Message"
        className="flex-1 px-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="text-blue-600 hover:text-blue-800 text-2xl transition-colors">
        ➤
      </button>
    </div>
  );
}