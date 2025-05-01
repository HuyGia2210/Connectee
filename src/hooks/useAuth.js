import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/user/auth/check", {
          credentials: "include", // gửi cookie
        });
        
        setIsAuth(res.ok);
        console.log(res.status)
        
      } catch(e) {
        setIsAuth(false);
        console.log(e);
      }
    };
    checkAuth();
  }, []);

  return isAuth;
}