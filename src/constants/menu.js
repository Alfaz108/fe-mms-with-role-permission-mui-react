import MailIcon from "@mui/icons-material/Mail";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { PermissionEnum } from "./enums/permission.enums";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingBagSharpIcon from "@mui/icons-material/ShoppingBagSharp";
import RestaurantIcon from "@mui/icons-material/Restaurant";

const MENU_ITEMS = () => {
  return [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: DashboardIcon,
      url: "/",
      role: [
        PermissionEnum.ADMIN,
        PermissionEnum.MANAGER,
        PermissionEnum.MEMBER,
      ],
    },
    {
      key: "admin-member",
      label: "Member",
      icon: SupervisorAccountIcon,
      url: "/admin/member",
      role: [PermissionEnum.ADMIN],
    },
    {
      key: "member",
      label: "Member",
      icon: SupervisorAccountIcon,
      url: "/member",
      role: [PermissionEnum.MANAGER, PermissionEnum.MEMBER],
    },
    {
      key: "deposit",
      label: "Deposit",
      icon: MonetizationOnIcon,
      url: "/deposit",
      role: [PermissionEnum.MANAGER],
    },
    {
      key: "market",
      label: "Market",
      icon: ShoppingBagSharpIcon,
      url: "/market",
      role: [PermissionEnum.MANAGER],
    },
    {
      key: "meal",
      label: "Meal",
      icon: RestaurantIcon,
      url: "/meal",
      role: [PermissionEnum.MANAGER],
    },
  ];
};

export default MENU_ITEMS;
