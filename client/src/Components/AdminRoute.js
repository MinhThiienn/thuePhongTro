import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute({ children }) {
  const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

  console.log("isAdmin từ store?", isAdmin);
  console.log("isLoggedIn từ store?", isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}

export default React.memo(AdminRoute);
