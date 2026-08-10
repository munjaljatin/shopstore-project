import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  // User is not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User is logged in but doesn't have permission
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    const redirectPaths = {
      customer: "/",
      vendor: "/dashboard",
    };

    return <Navigate to={redirectPaths[user?.role] || "/"} replace />;
  }

  return children;
};

export default ProtectedRoute;
