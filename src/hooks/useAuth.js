import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${API_URL}/api/user/auth/check`, {
          credentials: "include",
        });

        if (res.status === 200) {
          setIsAuth(true);
        } else {
          // Nếu trả về 401/403 hoặc bất kỳ gì khác 200
          setIsAuth(false);
          await fetch(`${API_URL}/api/user/logout`, {
            method: "post",
            credentials: "include",
          });
        }
      } catch (e) {
        // Chỉ khi lỗi mạng thật sự
        setIsAuth(false);
        await fetch(`${API_URL}/api/user/logout`, {
          method: "post",
          credentials: "include",
        });
        console.error(e);
      }
    };

    checkAuth();
  }, []);

  return isAuth;
}
