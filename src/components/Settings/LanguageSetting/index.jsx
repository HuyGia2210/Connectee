import locales from "@/language/locales";
import React from "react";

function LanguageSetting({ lang = "vn", setLang, scrMode }) {
  const isDark = scrMode === "dark";
  

  const setLanguageSetting = (e) => {
    const selected = e.target.value;
    if (selected) setLang(selected); // Gọi callback nếu có
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-md transition-all duration-300 ${
        isDark ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div>
        <label className="block mb-1 text-sm font-medium">{locales[lang].selectLanguage}</label>
        <select
          value={lang}
          onChange={setLanguageSetting}
          className={`w-full p-2 border rounded transition ${
            isDark
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value="vn">Tiếng Việt</option>
          <option value="en">English</option>
        </select>
      </div>
    </div>
  );
}

export default LanguageSetting;
