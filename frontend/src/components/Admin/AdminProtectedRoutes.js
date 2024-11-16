import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

const AdminProtectedRoutes = ({ element }) => {
  const adminIsAuthenticated = useSelector(
    (state) => state.admin_auth.loggedData.isUserLogged
  );

  return adminIsAuthenticated ? element : <Navigate to="/admin/auth/" />;
};

export default AdminProtectedRoutes;
