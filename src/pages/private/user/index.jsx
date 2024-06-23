//@ external lib import
import React, { useMemo, useState } from "react";

//@ MUI lib import
import { TableCell } from "@mui/material";

//@ component import
import CustomTable from "../../../components/app/table";
import UserCreateUpdate from "./UserCreateUpdate";

//@ util function
import DateFormatter from "../../../utils/date-time/DateFormatter";

//@ rtk api services & features
import { useUserListQuery } from "../../../redux/service/user/userService";

//@ assign default value
const DEFAULT_USER_VALUES = {
  name: "",
  mobile: "",
  roomNumber: "",
  status: "ACTIVE",
  depositAmount: 0,
  mealQuantity: 0,
  mealRate: 0,
  totalCost: 0,
  summaryAmount: 0,
};

//@ main component
const User = () => {
  /**
   * react local state
   */
  const [modal, setModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_USER_VALUES);

  const { data: userList, isLoading, isError } = useUserListQuery();

  const renderTableData = useMemo(() => userList?.data || [], [userList?.data]);

  /**
   * table columns
   */
  const columns = useMemo(
    () => [
      {
        id: "name",
        label: "Name",
        minWidth: 170,
        format: (value) => value,
        align: "center",
      },
      {
        id: "mobile",
        label: "Mobile",
        minWidth: 170,
        format: (value) => value,
        align: "center",
      },
      {
        id: "roomNumber",
        label: "Room Number",
        minWidth: 170,
        format: (value) => value,
        align: "center",
      },
      {
        id: "role",
        label: "Role",
        minWidth: 170,
        format: (value) => value,
        align: "center",
      },
      // {
      //   id: "status",
      //   label: "Status",
      //   minWidth: 170,
      //   format: (value) => (
      //     <TableCell
      //       sx={{
      //         color: value === "ACTIVE" ? "green" : "red",
      //       }}
      //       align="center"
      //     >
      //       {value?.toLowerCase()}
      //     </TableCell>
      //   ),
      //   align: "center",
      // },
      {
        id: "createdAt",
        label: "Created Date",
        minWidth: 170,
        format: (value) => (value ? DateFormatter({ date: value }) : t("n/a")),
        align: "center",
      },
    ],
    []
  );

  /**
   * Show the modal
   */
  const addShowModal = () => {
    setModal(true);
  };

  if (isLoading) {
    return <></>;
  } else if (isError) {
    return <></>;
  } else {
    return (
      <>
        <CustomTable
          columns={columns}
          data={renderTableData}
          addShowModal={addShowModal}
          tableInfo={{
            addTitle: "User",
          }}
        />

        <UserCreateUpdate
          {...{
            modal,
            setModal,
            defaultValues,
          }}
        />
      </>
    );
  }
};

export default User;
