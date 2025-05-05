import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import PublicRoute from "./components/MainPage/PublicRoute";
import ProtectedRoute from "./components/MainPage/ProtectedRoute";
import ChatPage from "./components/Chat/ChatPage";
import AuthPage from "./components/MainPage/AuthPage";
import AdminPage from "./components/Admin/AdminPage";
import ErrorPage from "./components/ErrorPage";
import SettingsPage from "./components/Settings/SettingsPage"; // Thêm SettingsPage
import { useEffect, useState } from "react";

export default function App() {
  const location = useLocation();
  const isFullScreen = location.pathname === "/chat" || location.pathname === "/admin" || location.pathname === "/settings";

  const [lang, setLang] = useState("vn");
  const [scrMode, setScrMode] = useState("light");

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchSetting = async()=>{
    try {
      const res = await fetch(
        `${API_URL}/api/user/get-settings`,
        { credentials: "include" }
      );
      const setting = await res.json(); 
      if(setting == null){
        localStorage.setItem("vn")
        localStorage.setItem("light")
        setLang("vn");
        setScrMode("light")
      }else{
        localStorage.setItem("lang",setting.lang)
        localStorage.setItem("scrMode",setting.scrMode)
        setLang(setting.lang);
        setScrMode(setting.scrMode)
      }
    } catch (e) {
      e;
      setLang("vn");
      setScrMode("light")
    }
  }

  useEffect(()=>{
    fetchSetting();
  },[])

  const saveLangSetting = async (lang) => {
    try {
      const res = await fetch(`${API_URL}/api/user/update-settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // nên nằm trong object fetch, không phải riêng rẽ
        body: JSON.stringify({
          lang: lang,
          scrMode: localStorage.getItem("scrMode"),
        }),
      });
  
      if (!res.ok) {
        throw new Error("Lỗi khi cập nhật setting");
      }
      
      console.log("Cập nhật setting thành công");
    } catch (e) {
      console.error("Lỗi:", e);
    }
  };
  

  const saveSrcModeSetting = async(scrMode)=>{
    console.log(JSON.stringify({
      lang: localStorage.getItem("lang"),
      scrMode: scrMode,
    }))
    try {
      const res = await fetch(`${API_URL}/api/user/update-settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // nên nằm trong object fetch, không phải riêng rẽ
        body: JSON.stringify({
          lang: localStorage.getItem("lang"),
          scrMode: scrMode,
        }),
      });
  
      if (!res.ok) {
        throw new Error("Lỗi khi cập nhật setting");
      }
      
      console.log("Cập nhật setting thành công");
    } catch (e) {
      console.error("Lỗi:", e);
    }
  }


  const changeLanguage = (lang) => {
    localStorage.setItem("lang",lang)
    saveLangSetting(lang);
    setLang(lang);
  };

  const changeScrMode = (scrMode) => {
    localStorage.setItem("scrMode",scrMode)
    saveSrcModeSetting(scrMode)
    setScrMode(scrMode);
  };

  return (
    <div id="root" className={isFullScreen ? "full-screen" : ""}>
      <Routes>
        {/* Đường dẫn public */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <AuthPage lang={lang} scrMode={scrMode}/>
            </PublicRoute>
          }
        />

        {/* Đường dẫn private */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage lang={lang} scrMode={scrMode}/>
            </ProtectedRoute>
          }
        />

        {/* Đường dẫn private cho admin */}
        <Route
          path="/admin"
          element={
            <AdminPage/>
          }
        />

        {/* Đường dẫn private cho settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage lang={lang} scrMode={scrMode} setLang={changeLanguage} setScrMode={changeScrMode}/>
            </ProtectedRoute>
          }
        />

        {/* Đường dẫn lỗi */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}