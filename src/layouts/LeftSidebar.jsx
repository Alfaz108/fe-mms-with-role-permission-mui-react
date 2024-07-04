import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Avatar, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MENU_ITEMS from "../constants/menu";
import { useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/image/logo.png";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 7px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7)} + 7px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const LeftSidebar = ({ open, setOpen }) => {
  const theme = useTheme();
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.auth);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const hasPermission = (menuItem) => {
    return menuItem.role?.includes(currentUser?.role);
  };

  const renderListItem = (item) => {
    return (
      <ListItem key={item.key} disablePadding sx={{ display: "block" }}>
        <ListItemButton
          component={Link}
          to={item.url}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
            backgroundColor:
              location.pathname === item.url
                ? theme.palette.action.selected
                : "inherit",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <item.icon />
          </ListItemIcon>
          <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Drawer variant="permanent" open={open} sx={{ boxShadow: 2 }}>
      <DrawerHeader
        sx={{
          backgroundColor: "#f5f5f5", // Adjust background color if needed
        }}
      >
        <Avatar src={logo} alt="Logo" sx={{ width: 60, height: 60 }} />
        <Typography variant="h9" sx={{ fontWeight: "bold", color: "#333" }}>
          DISH DASH
        </Typography>
        <Box></Box>
        <Box></Box>
      </DrawerHeader>
      <Divider />
      <List>
        {MENU_ITEMS().map(
          (item) => hasPermission(item) && renderListItem(item)
        )}
      </List>
    </Drawer>
  );
};

export default LeftSidebar;
