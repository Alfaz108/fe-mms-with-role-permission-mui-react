import * as React from "react";
import Button from "@mui/material/Button";

import CustomModal from "../../../components/app/from/CustomModal";

const Dashboard = () => {
  const inputFields = [
    {
      name: "mobile",
      label: "Mobile",
      type: "tel",
      placeholder: "Enter your mobile number",
      column: { xs: 12, sm: 12, md: 6, lg: 6 },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password",
      column: { xs: 12, sm: 12, md: 6, lg: 6 },
    },
  ];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
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
        onClick={handleClickOpen}
      >
        {`Add `}
      </Button>
      <CustomModal
        open={open}
        setOpen={setOpen}
        inputFields={inputFields}
        size={"xl"}
      />
    </React.Fragment>
  );
};

export default Dashboard;
