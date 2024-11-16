import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

const ClientProtectedRoutes = ({ element }) => {
  const userIsAuthenticated = useSelector(
    (state) => state.client_auth.loggedData.isUserLogged
  );

  return userIsAuthenticated ? element : <Navigate to="/signin" />;
};

export default ClientProtectedRoutes;
