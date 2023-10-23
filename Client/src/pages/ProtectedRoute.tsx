// In ProtectedRoute.js
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useRedirectOnAuth } from "../utils/hooks";

const ProtectedRoute = ({ children }: { children: any }) => {
  const { user } = useAppContext();

  const successRoute = "/top-animes";
  const failureRoute = "/landing";

  // Redirect to "/top-animes" if authenticated, otherwise to "/landing"
  useRedirectOnAuth(user, successRoute, failureRoute);

  if (!user) {
    return <Navigate to={failureRoute} />;
  }
  return children;
};

export default ProtectedRoute;
