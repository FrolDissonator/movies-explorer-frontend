import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ loggedIn, children }) => {
  return loggedIn ? children : <Navigate to='/' />;
}
export default ProtectedRouteElement;