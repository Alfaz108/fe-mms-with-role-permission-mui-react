//@ external lib import
import React, { useMemo, useState } from "react";

//@ MUI lib import
import { TableCell } from "@mui/material";

//@ component import
import CustomTable from "../../../components/app/table";
import UserCreateUpdate from "./UserCreateUpdate";

//@ util and helper function
import DateFormatter from "../../../utils/date-time/DateFormatter";
import { getURL } from "../../../helpers/qs";

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

  const { userList, isLoading, pagination, isError } = useUserListQuery(
    getURL(``),
    {
      selectFromResult: (data) => {
        console.log(data);
        return {
          pagination: data?.data?.pagination,
          userList: data?.data?.data,
          isLoading: data?.isLoading,
          isError: data?.isError,
        };
      },
    }
  );

  const renderTableData = useMemo(() => userList || [], [userList]);

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

      {
        id: "createdAt",
        label: "Created Date",
        minWidth: 170,
        format: (value) => (value ? DateFormatter({ date: value }) : "n/a"),
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
          paginationInfo={pagination}
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
