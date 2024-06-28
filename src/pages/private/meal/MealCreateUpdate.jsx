import React, { useEffect } from "react";
import * as yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMemberDropdownQuery } from "../../../redux/service/member/memberService";
import { useDepositCreateMutation } from "../../../redux/service/deposit/depositService";
import {
  useActiveMealListQuery,
  useMealCreateMutation,
} from "../../../redux/service/meal/mealService";
import CustomModal, {
  Transition,
} from "../../../components/app/from/CustomModal";
import CustomInputFields from "../../../components/app/from/CustomInputFIelds";
import { convertDropdownDataToObjKey } from "../../../helpers/array-object/convertArrToObjKey";

const validationSchema = yup
  .object()
  .shape({
    meals: yup
      .array()
      .of(
        yup.object().shape({
          member: yup.string().required("please select member"),
          mealQuantity: yup
            .number()
            .required("please enter meal quantity")
            .min(0.001, "Meal quantity must be greater than 0")
            .typeError("meal quantity must be a number"),
        })
      )
      .required(),

    mealDate: yup.string().required("deposit date is required"),
  })
  .required();

const MealCreateUpdate = ({
  modal,
  setModal,
  defaultValues,
  editData,
  emptyDefaultValue,
}) => {
  const [mealCreate, { isSuccess, isLoading }] = useMealCreateMutation();

  const { memberDropdown } = useMemberDropdownQuery(undefined, {
    selectFromResult: ({ data }) => ({
      memberDropdown: convertDropdownDataToObjKey(data),
    }),
  });

  const { data: activeMealList } = useActiveMealListQuery();

  const methods = useForm({
    mode: "all",
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, reset, watch } = methods;

  const onSubmit = (formData) => {
    formData.mealDate = new Date(formData.mealDate).toISOString();
    mealCreate({ postBody: formData });
  };

  const handleClose = () => {
    setModal(false);
    reset(emptyDefaultValue);
  };

  useEffect(() => {
    if (isSuccess) {
      setModal(false);
      reset(defaultValues);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (activeMealList) {
      reset({ ...defaultValues, meals: activeMealList });
    }
  }, [JSON.stringify(activeMealList)]);

  return (
    <FormProvider {...methods}>
      <Dialog
        open={modal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth={"xl"}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialogContent-root": { padding: 1 },
          "& .MuiPaper-root": { maxHeight: "80vh" },
        }}
      >
        <DialogTitle>
          <Typography variant="h6">{"Meal Create"}</Typography>
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

        <form id={"mealCreate"} onSubmit={handleSubmit(onSubmit)} noValidate>
          <DialogContent>
            <Box>
              <Grid container spacing={1}>
                <CustomInputFields
                  inputField={{
                    name: `mealDate`,
                    label: "Date",
                    type: "date",
                    placeholder: "Enter date",
                    required: true,
                    column: { xs: 12, sm: 12, md: 6, lg: 6 },
                  }}
                />
              </Grid>
            </Box>
          </DialogContent>

          <DialogContent dividers sx={{ maxHeight: "38vh", overflow: "auto" }}>
            {activeMealList?.map((item, index) => (
              <Box mt={3} key={index}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6} lg={6} mt={2}>
                    <Typography
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      Member Name: {memberDropdown?.[item?.member]}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <CustomInputFields
                      inputField={{
                        name: `meals[${index}].mealQuantity`,
                        label: "Quantity",
                        type: "number",
                        placeholder: "Enter quantity",
                        required: true,
                        column: { xs: 12, sm: 12, md: 6, lg: 6 },
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            ))}
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
                "&:hover": { backgroundColor: "#343a40" },
              }}
              startIcon={<AddCircleIcon />}
              type="submit"
            >
              {"Create Meal"}
              {isLoading && (
                <CircularProgress size={20} style={{ color: "#fff" }} />
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </FormProvider>
  );
};

export default MealCreateUpdate;
