import { useSelector } from "react-redux";
import { PermissionEnum } from "../../../constants/enums/permission.enums";
import ManagerDashboard from "./manager";
import MemberDashboard from "./member";
import AdminDashboard from "./admin";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  if (currentUser.role === PermissionEnum.MANAGER) {
    return <ManagerDashboard />;
  } else if (currentUser.role === PermissionEnum.MEMBER) {
    return <MemberDashboard />;
  } else if (currentUser.role === PermissionEnum.ADMIN) {
    return <AdminDashboard />;
  }
};

export default Dashboard;
