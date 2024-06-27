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
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const PageNotFound = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  const routerError = useRouteError();

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
        backgroundColor: "#f0f2f5",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          textAlign: "center",
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Box display="flex" justifyContent="center" mb={2}>
            <ErrorOutlineIcon color="error" style={{ fontSize: 50 }} />
          </Box>
          <Typography variant="h4" component="h1" gutterBottom color="error">
            404
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            PAGE NOT FOUND
          </Typography>
          <Typography variant="body1" paragraph>
            OIt's looking like you may have taken a wrong turn. Don't worry...
            it happens to the best of us. Here's a little tip that might help
            you get back on track.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToHome}
            sx={{ mt: 2 }}
          >
            Back to Home
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PageNotFound;
