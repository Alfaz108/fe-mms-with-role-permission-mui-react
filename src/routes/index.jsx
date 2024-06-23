import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";

import Login from "../pages/public/login";
import protectRoutes from "./middleware/ProtectRoute";
import PermissionDenied from "../components/common/PermissionDenied";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <PermissionDenied />,
    children: protectRoutes(),
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "not-found",
    element: <PermissionDenied />,
  },
]);
