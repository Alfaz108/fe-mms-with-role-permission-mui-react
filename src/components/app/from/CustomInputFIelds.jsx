//@ external lib import
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

//@ MUI lib import
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//@ main Component
const CustomInputFields = ({ inputField, column }) => {
  /**
   * react react hook form
   */
  const {
    control,
    formState: { errors },
  } = useFormContext();

  if (inputField.type === "select") {
    return (
      <Grid item {...column}>
        <FormControl fullWidth>
          <InputLabel id={`${inputField.name}-label`}>
            <>
              {inputField.label}
              {inputField.required && <span style={{ color: "red" }}>*</span>}
            </>
          </InputLabel>
          <Controller
            name={inputField.name}
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
                <Select
                  {...field}
                  labelId={`${inputField.name}-label`}
                  id={inputField.name}
                  label={
                    <>
                      {inputField.label}
                      {inputField.required && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </>
                  }
                  error={!!errors[field.name]}
                >
                  {inputField.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>

                {fieldState.error?.message && (
                  <FormHelperText error>
                    {fieldState.error?.message}inputField
                  </FormHelperText>
                )}
              </>
            )}
          />
        </FormControl>
      </Grid>
    );
  } else if (inputField.type === "date") {
    return (
      <Grid item {...column}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name={inputField.name}
            control={control}
            defaultValue={null}
            render={({ field }) => (
              <>
                <DatePicker
                  {...field}
                  label={
                    <>
                      {inputField.label}
                      {inputField.required && (
                        <span style={{ color: "red" }}>*</span>
                      )}
                    </>
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors[field.name]}
                      helperText={errors[field.name]?.message || ""}
                    />
                  )}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: Boolean(errors[field.name]),
                      size: inputField.size,
                    },
                  }}
                />
                {Boolean(errors[field.name]) && (
                  <FormHelperText error id={inputField.id}>
                    {errors[field.name]?.message}
                  </FormHelperText>
                )}
              </>
            )}
          />
        </LocalizationProvider>
      </Grid>
    );
  } else {
    return (
      <Grid item {...column}>
        <Controller
          name={inputField.name}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Box>
              <TextField
                {...field}
                id={inputField.name}
                type={inputField.type}
                placeholder={inputField.placeholder}
                variant="outlined"
                fullWidth
                label={
                  <>
                    {inputField.label}
                    {inputField.required && (
                      <span style={{ color: "red" }}>*</span>
                    )}
                  </>
                }
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message || ""}
              />
            </Box>
          )}
        />
      </Grid>
    );
  }
};

CustomInputFields.propTypes = {
  inputField: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(["text", "number", "select", "date"]).isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
    required: PropTypes.bool,
  }).isRequired,
  column: PropTypes.object,
};

export default CustomInputFields;
