import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";

import Login from "../pages/public/login";
import protectRoutes from "./middleware/ProtectRoute";
import PageNotFound from "../components/common/PageNotFound";

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
    element: <PageNotFound />,
  },
]);
