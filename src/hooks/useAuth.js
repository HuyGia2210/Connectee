import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/auth/check`, {
          credentials: "include", // gửi cookie
        });
        
        setIsAuth(res.ok);
        console.log(res.status)
        
      } catch(e) {
        setIsAuth(false);
        await fetch(`${API_URL}/api/user/logout`, {
          method: "post",
          credentials: "include", // gửi cookie
        });
        console.log(e);
      }
    };
    checkAuth();
  }, []);

  return isAuth;
}