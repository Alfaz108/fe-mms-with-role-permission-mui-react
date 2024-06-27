//External Lib Import
import { Box, Typography } from "@mui/material";

const NoData = ({ message = "No Data Found!" }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Typography variant="h4" align="center">
        {message}
      </Typography>
    </Box>
  );
};

export default NoData;
