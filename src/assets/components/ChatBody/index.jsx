export default function ChatBody() {
    return (
      <div className="flex-1 overflow-y-auto bg-[url('/bg-telegram.png')] bg-cover p-6 space-y-4">
        <div className="text-center text-gray-600 text-sm">Today</div>
  
        <div className="max-w-[70%] bg-white p-3 rounded-xl shadow text-sm">
          OMG 😳 do you remember what you did last night at the work night out?
          <div className="flex justify-end space-x-1 text-xs mt-1 text-gray-400">
            <span>18:12</span>
            <span>✔️</span>
          </div>
        </div>
  
        <div className="flex justify-end">
          <div className="max-w-[70%] bg-green-100 p-3 rounded-xl shadow text-sm">
            no haha
            <div className="flex justify-end space-x-1 text-xs mt-1 text-gray-400">
              <span>18:16</span>
              <span>✔️✔️</span>
            </div>
          </div>
        </div>
  
        <div className="flex justify-end">
          <div className="max-w-[70%] bg-green-100 p-3 rounded-xl shadow text-sm">
            i don't remember anything 😅
            <div className="flex justify-end space-x-1 text-xs mt-1 text-gray-400">
              <span>18:16</span>
              <span>✔️✔️</span>
            </div>
          </div>
        </div>
      </div>
    );
  }