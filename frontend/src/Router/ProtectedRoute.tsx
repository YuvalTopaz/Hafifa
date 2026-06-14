import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type Role = "employee" | "customer";

export default function ProtectedRoute({
  allowedRoles,
}: {
  allowedRoles: Role[];
}) {
  const { user, isEmployee, isActiveCustomer } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const isAllowed =
    (allowedRoles.includes("employee") && isEmployee) ||
    (allowedRoles.includes("customer") && isActiveCustomer);

  if (!isAllowed) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
}