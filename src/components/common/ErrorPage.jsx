import React from "react";
import { Box, Container } from "@mui/material";
import img from "../../assets/image/error.svg";

const ErrorPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        width: "80vw",
      }}
    >
      <Box
        component="img"
        sx={{
          width: "8%",
        }}
        src={img}
        alt="Error"
      />
    </Container>
  );
};

export default ErrorPage;
