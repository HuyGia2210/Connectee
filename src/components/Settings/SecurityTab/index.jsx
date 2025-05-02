import React from 'react';

function SecurityTab() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Bảo mật</h3>
      <ul className="space-y-4">
        <li>Email Security <span className="text-green-500 ml-2">✔</span></li>
        <li>Two Factor Authentication <span className="text-gray-500 ml-2">❓</span></li>
      </ul>
    </div>
  );
}

export default SecurityTab;