import { useAuth } from "./firebase";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const utilizador = useAuth();
  return <>{utilizador && <Outlet />}</>;
}

export default ProtectedRoutes;
