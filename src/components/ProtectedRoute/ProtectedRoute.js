import React from "react";
import { Navigate } from "react-router-dom";
import { PAGE_MAIN } from "../../utils/constants";

const ProtectedRouteElement = ({ loggedIn, children }) => {
  return loggedIn ? children : <Navigate to={PAGE_MAIN} />;
};
export default ProtectedRouteElement;
