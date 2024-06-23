//@ external lib import
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//@ MUI lib import

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Grow, IconButton, Typography, Box, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//@ component import
import CustomInputFIelds from "./CustomInputFIelds";

//@ dialog transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return (
    <Grow
      timeout={{
        appear: 0,
        enter: 10000,
        exit: 30000,
      }}
      ref={ref}
      {...props}
    />
  );
});

//@ main component
const CustomModal = ({
  modal,
  setModal,
  inputFields,
  size,
  title,
  addTitle,
  defaultValues,
  schemaResolver,
  onSubmit,
  modalID,
  column = { xs: 12, sm: 12, md: 6, lg: 6, xl: 3 },
}) => {
  /**
   * react react hook form
   */
  const methods = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schemaResolver),
  });

  const { handleSubmit } = methods;

  /**
   * modal close when click close button
   */
  const handleClose = () => {
    setModal(false);
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={size}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialogContent-root": {
            padding: 3,
            overflow: "visible",
          },
          "& .MuiPaper-root": {
            maxHeight: "none",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6">{title}</Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography sx={{ fontWeight: "bold", marginTop: 2 }}>
            The field levels marked with
            <span style={{ color: "red" }}> ( * ) </span>
            are required input fields.
          </Typography>
        </DialogTitle>
        <form id={modalID} onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <Box mt={1}>
              <Grid container spacing={2}>
                {inputFields?.reduce((acc, inputField, index) => {
                  const inputColumn = inputField.column || column;

                  acc.push(
                    <CustomInputFIelds
                      key={index}
                      inputField={inputField}
                      index={index}
                      column={inputColumn}
                      container={inputField.container}
                    />
                  );
                  return acc;
                }, [])}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#343a40",
                color: "#fff",
                marginRight: 2,
                marginBottom: 2,
                paddingTop: 1,
                paddingBottom: 1,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#343a40",
                },
              }}
              startIcon={<AddCircleIcon />}
              type="submit"
            >
              {addTitle}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
};

export default CustomModal;
