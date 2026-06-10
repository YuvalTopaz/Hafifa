import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Role = "employee" | "customer";

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles: Role[];
}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}