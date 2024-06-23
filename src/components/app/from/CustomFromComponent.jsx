//@ external lib import
import React from "react";

//@ MUI lib import
import { Box, Grid } from "@mui/material";

//@ component import
import CustomInputFIelds from "./CustomInputFIelds";

//@ main Component
const CustomFromComponent = ({
  inputFields,
  column = { xs: 12, sm: 12, md: 6, lg: 12, xl: 12 },
}) => {
  return (
    <>
      <Box mt={2}>
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
    </>
  );
};

export default CustomFromComponent;
