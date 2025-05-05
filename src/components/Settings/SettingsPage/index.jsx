import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; // Biểu tượng mũi tên từ lucide-react
import MainContent from '../MainContent';
import locales from '@/language/locales';

function SettingsPage({lang, scrMode, setLang, setScrMode}) {
  const [activeTab, setActiveTab] = useState('accountInfo');
  const [appUser, setAppUser] = useState(null)
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const getAppUser = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/user/get-appUser-by-nickname?nickname=` +
          localStorage.getItem("nickname"),
        { credentials: "include" }
      );
      const user = await res.json(); 
      setAppUser(user);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(()=>{
    getAppUser()
  },[])

  const tabs = [
    { key: 'accountInfo', label: locales[lang].accountInformation },
    { key: 'userInterface', label: locales[lang].userInterface },
    { key: 'language', label: locales[lang].language },
    { key: 'changeInfomation', label: locales[lang].changeInfomation },
  ];

  return (
    <div
      className="flex h-screen"
      style={{
        backgroundColor: scrMode === "light" ? "#f9fafb" : "#111827", // gray-50 / gray-900
      }}
    >
      {/* Nội dung chính */}
      <div className="flex-1 p-4 md:p-8 relative">
        {/* Nút quay lại */}
        <button
          onClick={() => navigate("/chat")}
          className="flex items-center gap-1 text-sm mb-4 transition"
          style={{
            color: scrMode === "light" ? "#4b5563" : "#d1d5db", // gray-600 / gray-300
          }}
        >
          <ArrowLeft size={16} />
          {locales[lang].back}
        </button>
  
        <div
          className="rounded-xl shadow-lg p-6"
          style={{
            backgroundColor: scrMode === "light" ? "#ffffff" : "#1f2937", // white / gray-800
          }}
        >
          {/* Tabs */}
          <div
            className="flex flex-wrap gap-4 mb-6 border-b pb-2"
            style={{
              borderBottomColor: scrMode === "light" ? "#e5e7eb" : "#374151", // gray-200 / gray-700
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-4 py-2 rounded-full text-sm transition-all"
                style={{
                  backgroundColor:
                    activeTab === tab.key
                      ? scrMode === "light"
                        ? "#dbeafe" // blue-100
                        : "#1e3a8a20" // blue-900/10
                      : "transparent",
                  color:
                    activeTab === tab.key
                      ? "#1d4ed8" // blue-700
                      : scrMode === "light"
                      ? "#6b7280" // gray-500
                      : "#9ca3af", // gray-400
                  fontWeight: activeTab === tab.key ? "500" : "normal",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
  
          {/* Nội dung chính theo tab */}
          <MainContent
            activeTab={activeTab}
            appUser={appUser}
            lang={lang}
            scrMode={scrMode}
            setLang={setLang}
            setScrMode={setScrMode}
          />
        </div>
      </div>
    </div>
  );
  
}

export default SettingsPage;
