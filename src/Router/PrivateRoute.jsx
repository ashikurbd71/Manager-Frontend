import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { getTokenFromLocalStorage } from "../Auth/token";

import useAuth from "../Provider/UseAuth/useAuth";
import { CgSearchLoading } from "react-icons/cg";


const PrivateRoute = ({ children, roles = [] }) => {
    const { user, isLoading: userLoading } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

   console.log(user,roles)

//   const { user, isLoading: userLoading } = useAuth();
  const token = getTokenFromLocalStorage();

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [user, token]);

  if (isLoading || userLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CgSearchLoading  className="text-[70px] animate-ping text-[#0284C7]" />
      </div>
    );
  }

  if (isAuthenticated) {
    // Check if user has one of the required roles or is a Super Admin
    const userRoles = user?.role || null;
    const isSuperAdmin = userRoles.includes("Super Admin");
    const hasRequiredRole = roles.length === 0 || roles.some(role => userRoles.includes(role));

    if (isSuperAdmin || hasRequiredRole) {
      return children;
    } else {
      return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
    }
  } else {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
};

export default PrivateRoute;
