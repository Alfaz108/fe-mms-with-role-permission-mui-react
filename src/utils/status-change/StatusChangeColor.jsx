import { Typography } from "@mui/material";

/**
 * Custom cell renderer for status
 */
export const StatusChangeColor = ({ value }) => {
  const formattedValue = value.charAt(0) + value.slice(1).toLowerCase();
  const statusStyles = {
    ACTIVE: { color: "green", fontWeight: "bold" },
    INACTIVE: { color: "red", fontWeight: "bold" },
  };

  return <Typography style={statusStyles[value]}>{formattedValue}</Typography>;
};
