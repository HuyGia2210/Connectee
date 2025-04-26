import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function PublicRoute({ children }) {
  const isAuth = useAuth();

  if (isAuth === null) return <div>Đang kiểm tra đăng nhập...</div>;
  if (isAuth) return <Navigate to="/chat" />;

  return children;
}
