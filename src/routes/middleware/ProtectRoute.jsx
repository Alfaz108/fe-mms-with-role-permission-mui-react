import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import privateRoutes from "../PrivateRoute";

const ProtectRoute = ({ route, children }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  console.log({ currentUser });
  const token = localStorage.getItem("token");

  if (!currentUser && !token) {
    return <Navigate to="/auth/login" replace />;
  }

  const isAuthorized = () => {
    return route?.routePermission.includes(currentUser?.role);
  };

  return isAuthorized() ? children : <Navigate to="/not-found" replace />;
};

const protectRoutes = () => {
  const protectedRoutes = privateRoutes.map((route) => ({
    ...route,
    element: <ProtectRoute route={route}>{route.element}</ProtectRoute>,
  }));

  return protectedRoutes;
};

export default protectRoutes;
