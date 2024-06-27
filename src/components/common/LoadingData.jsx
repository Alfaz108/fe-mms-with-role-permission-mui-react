import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const LoadingData = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "75vh",
        width: "80vw",
      }}
    >
      <CircularProgress size={60} style={{ color: "#343a40" }} />
    </Box>
  );
};

export default LoadingData;
