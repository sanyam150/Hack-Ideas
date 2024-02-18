import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userInformation } from "./userInformation";

const ProtectedRoutes = ({ children, redirectPath, isChallengeForm }) => {
  let location = useLocation();

  if (
    (userInformation.isUserLoggedIn() && !isChallengeForm) ||
    (!userInformation.isUserLoggedIn() && isChallengeForm)
  ) {
    return <Navigate to={redirectPath} state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoutes;