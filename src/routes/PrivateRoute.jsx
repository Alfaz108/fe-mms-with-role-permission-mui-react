import { PermissionEnum } from "../constants/enums/permission.enums";
import Member from "../pages/private/admin/member";
import Dashboard from "../pages/private/dashboard";

const privateRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    routePermission: [PermissionEnum.ADMIN, PermissionEnum.MANAGER],
  },
  {
    path: "/admin/member",
    element: <Member />,
    routePermission: [PermissionEnum.ADMIN],
  },
];

export default privateRoutes;
