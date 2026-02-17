import * as React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { useShallow } from "zustand/react/shallow";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
  className?: string;
}

const DEFAULT_REDIRECT_PATH = "/landing";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = DEFAULT_REDIRECT_PATH,
  fallback,
  className,
}) => {
  const { user, isAuthenticated } = useAuthStore(
    useShallow((s) => ({ user: s.user, isAuthenticated: s.isAuthenticated }))
  );
  const location = useLocation();

  if (fallback && !isAuthenticated) {
    return (
      <div className={`w-full h-full ${className || ""}`}>
        {fallback}
      </div>
    );
  }

  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return (
    <div className={`w-full h-full ${className || ""}`}>
      {children}
    </div>
  );
};

export default ProtectedRoute;
