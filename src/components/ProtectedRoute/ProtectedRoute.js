import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ loggedIn, children }) => {
  console.log(loggedIn);
  return loggedIn ? children : <Navigate to='/' />;
}
export default ProtectedRouteElement;