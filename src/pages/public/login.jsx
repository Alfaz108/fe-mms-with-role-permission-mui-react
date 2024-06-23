import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Card, Box, Typography, Button, Grid } from "@mui/material";
import CustomFormComponent from "../../components/app/from/CustomFromComponent";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginMutation } from "../../redux/service/auth/authService";
import { useNavigate } from "react-router-dom";

export const DEFAULT_LOGIN_VALUES = {
  mobile: "01710303309",
  password: "MMS12345",
};

const Login = () => {
  const navigate = useNavigate();

  const [login, { data, isLoading }] = useLoginMutation();

  console.log(data);

  const schemaResolver = yup
    .object()
    .shape({
      mobile: yup
        .string()
        .required("Please enter your mobile number")
        .matches(/^[0-9]{11}$/, "Invalid mobile number"),
      password: yup
        .string()
        .required("Please enter a password")
        .min(6, "Password must be at least 6 characters"),
    })
    .required();
  const methods = useForm({
    defaultValues: DEFAULT_LOGIN_VALUES,
    resolver: yupResolver(schemaResolver),
    mode: "all",
  });

  const { handleSubmit, control, watch } = methods;

  const inputFields = [
    {
      name: "mobile",
      label: "Mobile",
      type: "tel",
      placeholder: "Enter your mobile number",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
    },
  ];

  const onSubmit = (formData) => {
    login(formData);
  };

  useEffect(() => {
    if (data?.data?.token) {
      localStorage.setItem("token", data?.data?.token);
      navigate("/");
    }
  }, [data]);

  return (
    <FormProvider {...methods}>
      <form id="loginForm" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#f0f0f0",
          }}
        >
          <Card
            sx={{
              maxWidth: 350,
              width: "100%",
              boxShadow: 4,
            }}
          >
            <Box sx={{ backgroundColor: "#343a40", padding: 2 }}>
              <Typography
                variant="h5"
                align="center"
                marginBottom={2}
                fontWeight="bold"
                sx={{ color: "#fff", marginTop: 3 }}
              >
                MEAL MANAGEMENT
              </Typography>
            </Box>
            <Box sx={{ padding: 3 }}>
              <Typography
                variant="h5"
                align="center"
                marginBottom={2}
                fontWeight="bold"
              >
                Login
              </Typography>

              <CustomFormComponent inputFields={inputFields} />
              <Box mt={2}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      sx={{
                        backgroundColor: "#343a40",
                        color: "#fff",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#343a40",
                        },
                        padding: 1,
                      }}
                      type="submit"
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>
        </Box>
      </form>
    </FormProvider>
  );
};

export default Login;
