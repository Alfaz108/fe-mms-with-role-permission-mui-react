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

const MemberDashboard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useMemberDashboardDataQuery({ id: currentUser?.member });
  console.log({ dashboardData });

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
                  <PaidIcon sx={{ marginRight: 1 }} /> Total Deposit
                </Typography>
              </Box>
              <Box sx={{ padding: 1 }}>
                <Typography align="center" fontWeight="bold">
                  {formatNumber(dashboardData?.depositAmount)}
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
                  <RestaurantIcon sx={{ marginRight: 1 }} /> Total Meal
                </Typography>
              </Box>
              <Box sx={{ padding: 1 }}>
                <Typography align="center" fontWeight="bold">
                  {formatNumber(dashboardData?.mealQuantity)}
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
                  <SummarizeIcon sx={{ marginRight: 1 }} /> Meal Rate
                </Typography>
              </Box>
              <Box sx={{ padding: 1 }}>
                <Typography align="center" fontWeight="bold">
                  {formatNumber(dashboardData?.mealRate)}
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
                  <ShoppingBagIcon sx={{ marginRight: 1 }} /> Total Cost
                </Typography>
              </Box>
              <Box sx={{ padding: 1 }}>
                <Typography align="center" fontWeight="bold">
                  {formatNumber(dashboardData?.totalCost)}
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
                  <AccountBalanceWalletIcon sx={{ marginRight: 1 }} /> Cash In
                  Hand
                </Typography>
              </Box>
              <Box sx={{ padding: 1 }}>
                <Typography align="center" fontWeight="bold">
                  {formatNumber(dashboardData?.summaryAmount)}
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
};

export default MemberDashboard;
