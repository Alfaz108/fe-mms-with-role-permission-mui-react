import MailIcon from "@mui/icons-material/Mail";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { PermissionEnum } from "./enums/permission.enums";
import DashboardIcon from "@mui/icons-material/Dashboard";
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
      key: "menu",
      label: "Menu",
      icon: MailIcon,
      url: "/menu",
      role: [PermissionEnum.MANAGER],
    },
  ];
};

export default MENU_ITEMS;
