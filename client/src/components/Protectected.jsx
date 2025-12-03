import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // If no user or role is not in allowedRoles, redirect to login
      if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
        navigate("/login", { replace: true });
      }
    }
  }, [user, loading, allowedRoles, navigate]);

  if (loading) return <div>Loading...</div>;

  if (!user || (allowedRoles.length > 0 && !allowedRoles.includes(user.role))) {
    return null; // While redirecting
  }

  return <>{children}</>;
};

export default ProtectedRoute;
