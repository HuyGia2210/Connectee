import React, { useState } from "react";
import locales from "@/language/locales";

function UserInterface({ scrMode = "light", setScrMode, lang }) {
  const [mode, setMode] = useState(scrMode);

  const handleModeChange = (e) => {
    const selected = e.target.value;
    setMode(selected);
    if (setScrMode) setScrMode(selected); // Gọi callback nếu có
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-md transition-all duration-300 ${
        mode === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="mb-5">
        <label htmlFor="theme" className="block text-sm font-semibold mb-2">
          {locales[lang].userInterface}
        </label>
        <select
          id="theme"
          value={mode}
          onChange={handleModeChange}
          className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
            mode === "dark"
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-gray-50 text-black border-gray-300"
          }`}
        >
          <option value="light">{locales[lang].light}</option>
          <option value="dark">{locales[lang].dark}</option>
        </select>
      </div>
    </div>
  );
}

export default UserInterface;
