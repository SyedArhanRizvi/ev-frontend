
import React from "react";
import { Navigate } from "react-router-dom";
import { useWebContext } from "../context/WebContext";

const ProtectedRoute = ({ children }) => {
  const { isLogin } = useWebContext();

  if (!isLogin) {
    return <Navigate to="/login-page" replace />;
  }

  return children;
};

export default ProtectedRoute;
