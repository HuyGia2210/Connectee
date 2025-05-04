import React from "react";
import locales from "@/language/locales";

function AccountInfoTab({ appUser, scrMode, lang }) {
  // Lấy chữ cái đầu của từ cuối cùng trong nickname
  const getAvatarLetter = (nickname) => {
    if (!nickname) return "?";
    if (nickname === "embeddedAIByConnectee") return "AI";
    const parts = nickname.trim().split(" ");
    return parts[parts.length - 1][0]?.toUpperCase() || "?";
  };
  return (
    <div
      className="rounded-lg p-6 shadow-sm space-y-6"
      style={{
        backgroundColor: scrMode === "light" ? "#f9fafb" : "#1f2937", // gray-50 / gray-800
      }}
    >
      <h3
        className="text-xl font-semibold mb-4"
        style={{
          color: scrMode === "light" ? "#1f2937" : "#f9fafb", // gray-800 / gray-50
        }}
      >
        {locales[lang].accountInformation}
      </h3>
  
      {appUser && (
        <>
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            <h2 className="text-3xl">{getAvatarLetter(appUser.fullName)}</h2>
          </div>
  
          <div>
            <p
              className="text-lg font-semibold"
              style={{
                color: scrMode === "light" ? "#111827" : "#f9fafb", // gray-900 / gray-50
              }}
            >
              {appUser.fullName}
            </p>
            <p
              className="text-sm"
              style={{
                color: scrMode === "light" ? "#6b7280" : "#9ca3af", // gray-500 / gray-400
              }}
            >
              @{appUser.nickname}
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                className="block text-sm mb-1"
                style={{
                  color: scrMode === "light" ? "#6b7280" : "#9ca3af", // gray-500 / gray-400
                }}
              >
                Email
              </label>
              <p
                className="font-medium"
                style={{
                  color: scrMode === "light" ? "#1f2937" : "#f9fafb", // gray-800 / gray-50
                }}
              >
                {appUser.email || locales[lang].notAvailable}
              </p>
            </div>
  
            <div>
              <label
                className="block text-sm mb-1"
                style={{
                  color: scrMode === "light" ? "#6b7280" : "#9ca3af",
                }}
              >
                {locales[lang].birthdate}
              </label>
              <p
                className="font-medium"
                style={{
                  color: scrMode === "light" ? "#1f2937" : "#f9fafb",
                }}
              >
                {appUser.dob
                  ? new Date(appUser.dob).toLocaleDateString("vi-VN")
                  : locales[lang].notAvailable}
              </p>
            </div>
  
            <div>
              <label
                className="block text-sm mb-1"
                style={{
                  color: scrMode === "light" ? "#6b7280" : "#9ca3af",
                }}
              >
                {locales[lang].gender}
              </label>
              <p
                className="font-medium"
                style={{
                  color: scrMode === "light" ? "#1f2937" : "#f9fafb",
                }}
              >
                {appUser.gender === "MALE"
                  ? locales[lang].male
                  : appUser.gender === "FEMALE"
                  ? locales[lang].female
                  : locales[lang].other}
              </p>
            </div>
  
            <div>
              <label
                className="block text-sm mb-1"
                style={{
                  color: scrMode === "light" ? "#6b7280" : "#9ca3af",
                }}
              >
                {locales[lang].nickname}
              </label>
              <p
                className="font-medium"
                style={{
                  color: scrMode === "light" ? "#1f2937" : "#f9fafb",
                }}
              >
                {appUser.nickname}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
  
}

export default AccountInfoTab;
