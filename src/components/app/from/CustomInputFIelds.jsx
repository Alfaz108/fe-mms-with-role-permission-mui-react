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
import dayjs from "dayjs";

//@ main Component
const CustomInputFields = ({ inputField, column }) => {
  /**
   * react react hook form
   */
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // const defaultDate = inputField.defaultValue
  //   ? dayjs(inputField.defaultValue).toDate()
  //   : null;

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
                  {inputField?.options?.map((option) => (
                    <MenuItem key={option?.value} value={option?.value}>
                      {option?.label}
                    </MenuItem>
                  ))}
                </Select>

                {fieldState.error?.message && (
                  <FormHelperText error>
                    {fieldState.error?.message}
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
            key={inputField.id}
            control={control}
            name={inputField.name}
            render={({ field, fieldState: { error } }) => {
              return (
                <>
                  <DatePicker
                    format={inputField.dateFormat || "MMMM DD, YYYY"}
                    value={dayjs(field.value)}
                    inputRef={field.ref}
                    disabled={inputField.disabled}
                    onChange={(date) =>
                      inputField.extraOnchange
                        ? inputField.extraOnchange(dayjs(date).toISOString())
                        : field.onChange(dayjs(date).toISOString())
                    }
                    minDate={
                      inputField.minDate ? dayjs(inputField.minDate) : null
                    }
                    maxDate={inputField.maxDate ? dayjs(new Date()) : null}
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
                        error: Boolean(error),
                        size: inputField.size,
                      },
                    }}
                  />
                  {Boolean(error) && (
                    <FormHelperText error id={inputField?.id}>
                      {error?.message}
                    </FormHelperText>
                  )}
                </>
              );
            }}
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
          render={({ field, fieldState: { error } }) => (
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
              />
              {Boolean(error) && (
                <FormHelperText error id={inputField?.id}>
                  {error?.message}
                </FormHelperText>
              )}
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
