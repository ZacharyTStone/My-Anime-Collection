import * as React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

// Types and Interfaces
interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  fallback?: React.ReactNode;
  className?: string;
}

// Constants
const DEFAULT_REDIRECT_PATH = "/landing";

// Styled Components
const ProtectedRouteContainer = styled.div`
  width: 100%;
  height: 100%;
`;

/**
 * ProtectedRoute component that guards routes requiring authentication
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = DEFAULT_REDIRECT_PATH,
  fallback,
  className,
}) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  // Show fallback while checking authentication
  if (fallback && !isAuthenticated) {
    return (
      <ProtectedRouteContainer className={className}>
        {fallback}
      </ProtectedRouteContainer>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  return (
    <ProtectedRouteContainer className={className}>
      {children}
    </ProtectedRouteContainer>
  );
};

export default ProtectedRoute;
