import { PermissionEnum } from "../constants/enums/permission.enums";
import AdminMember from "../pages/private/admin/member";
import Dashboard from "../pages/private/dashboard";
import Deposit from "../pages/private/deposit";
import Market from "../pages/private/market";
import Meal from "../pages/private/meal";
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
    routePermission: [PermissionEnum.MANAGER, PermissionEnum.MEMBER],
  },
  {
    path: "/deposit",
    element: <Deposit />,
    routePermission: [PermissionEnum.MANAGER],
  },

  {
    path: "/market",
    element: <Market />,
    routePermission: [PermissionEnum.MANAGER],
  },
  {
    path: "/meal",
    element: <Meal />,
    routePermission: [PermissionEnum.MANAGER],
  },
];

export default privateRoutes;
