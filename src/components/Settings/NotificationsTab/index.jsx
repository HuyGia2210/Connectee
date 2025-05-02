import React from 'react';

function NotificationsTab() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Thông báo</h3>
      <ul className="space-y-4">
        <li>Bật thông báo <span className="text-gray-500 ml-2">❓</span></li>
        <li>Tin tức hàng tuần <span className="text-gray-500 ml-2">❓</span></li>
      </ul>
    </div>
  );
}

export default NotificationsTab;