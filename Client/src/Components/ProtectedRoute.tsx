import type React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuthSelector } from "../stores/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
  className?: string;
}

const DEFAULT_REDIRECT_PATH = "/landing";

const ProtectedRoute = ({
  children,
  redirectTo = DEFAULT_REDIRECT_PATH,
  fallback,
  className,
}: ProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuthSelector((s) => ({
    user: s.user,
    isAuthenticated: s.isAuthenticated,
  }));
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
