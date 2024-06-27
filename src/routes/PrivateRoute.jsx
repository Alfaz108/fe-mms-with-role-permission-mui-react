import { PermissionEnum } from "../constants/enums/permission.enums";
import AdminMember from "../pages/private/admin/member";
import Dashboard from "../pages/private/dashboard";
import Member from "../pages/private/member";

const privateRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    routePermission: [
      PermissionEnum.ADMIN,
      PermissionEnum.MANAGER,
      PermissionEnum.MEMBER,
    ],
  },
  {
    path: "/admin/member",
    element: <AdminMember />,
    routePermission: [PermissionEnum.ADMIN],
  },
  {
    path: "/member",
    element: <Member />,
    routePermission: [PermissionEnum.MEMBER, PermissionEnum.MANAGER],
  },
];

export default privateRoutes;
