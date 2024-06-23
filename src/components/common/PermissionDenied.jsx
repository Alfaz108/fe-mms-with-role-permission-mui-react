import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useRouteError } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
} from "@mui/material";

const PermissionDenied = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  const routerError = useRouteError();

  console.log("routerError", routerError);

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <Container
      component="main"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          textAlign: "center",
          padding: 3,
        }}
      >
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom color="error">
            Access Denied
          </Typography>
          <Typography variant="body1" paragraph>
            Sorry, {currentUser?.name || "Guest"}, you do not have permission to
            view this page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToHome}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PermissionDenied;
