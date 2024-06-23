import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Navbar";
import LeftSidebar from "./LeftSidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const DefaultLayout = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      <CssBaseline />
      <Navbar open={open} setOpen={setOpen} />
      <LeftSidebar open={open} setOpen={setOpen} />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}
      >
        <DrawerHeader />
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
