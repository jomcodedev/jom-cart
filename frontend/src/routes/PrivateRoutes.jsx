import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

function PrivateRoute({ children, allowedRoles }) {
  const { user } = useUserStore();
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/" replace />;
  return children;
}

export default PrivateRoute;
