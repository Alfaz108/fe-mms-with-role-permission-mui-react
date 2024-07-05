import * as React from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import BoyIcon from "@mui/icons-material/Boy";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import PaidIcon from "@mui/icons-material/Paid";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SummarizeIcon from "@mui/icons-material/Summarize";
import LoadingData from "../../../../components/common/LoadingData";
import ErrorPage from "../../../../components/common/ErrorPage";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import formatNumber from "../../../../helpers/numberFormater";
import { useMemberDashboardDataQuery } from "../../../../redux/service/member-dashboard/memberDashboardService";
import { useSelector } from "react-redux";
import { useAdminDashboardDataQuery } from "../../../../redux/service/dash-board/dashboardService";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
const AdminDashboard = () => {
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useAdminDashboardDataQuery();

  if (isLoading) {
    return <LoadingData />;
  } else if (isError) {
    return <ErrorPage />;
  } else {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                minWidth: "18vw",
                boxShadow: 3,
                height: 115,
                margin: 1,
              }}
            >
              <Box sx={{ backgroundColor: "#343a40", padding: 1 }}>
                <Typography
                  align="center"
                  fontWeight="bold"
                  sx={{
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <GroupsIcon sx={{ marginRight: 1 }} /> Total User
                </Typography>
              </Box>
              <Box sx={{ padding: 1 }}>
                <Typography align="center" fontWeight="bold">
                  {dashboardData?.totalUsers - 1}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                minWidth: "18vw",
                boxShadow: 3,
                height: 115,
                margin: 1,
              }}
            >
              <Box sx={{ backgroundColor: "#343a40", padding: 1 }}>
                <Typography
                  align="center"
                  fontWeight="bold"
                  sx={{
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <PeopleAltIcon sx={{ marginRight: 1 }} /> Total Member
                </Typography>
              </Box>
              <Box sx={{ padding: 1 }}>
                <Typography align="center" fontWeight="bold">
                  {dashboardData?.memberCount}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                minWidth: "18vw",
                boxShadow: 3,
                height: 115,
                margin: 1,
              }}
            >
              <Box sx={{ backgroundColor: "#343a40", padding: 1 }}>
                <Typography
                  align="center"
                  fontWeight="bold"
                  sx={{
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <FollowTheSignsIcon sx={{ marginRight: 1 }} /> Total Manager
                </Typography>
              </Box>
              <Box sx={{ padding: 1 }}>
                <Typography align="center" fontWeight="bold">
                  {Number(dashboardData?.totalUsers - 1) -
                    Number(dashboardData?.memberCount)}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card
              sx={{
                minWidth: "18vw",
                boxShadow: 3,
                height: 115,
                margin: 1,
              }}
            >
              <Box sx={{ backgroundColor: "#343a40", padding: 1 }}>
                <Typography
                  align="center"
                  fontWeight="bold"
                  sx={{
                    color: "#fff",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <PersonIcon sx={{ marginRight: 1 }} />
                  Present Manager Name
                </Typography>
              </Box>
              <Box sx={{ padding: 1 }}>
                <Typography align="center" fontWeight="bold">
                  {dashboardData?.managerName}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default AdminDashboard;
