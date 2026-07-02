import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
