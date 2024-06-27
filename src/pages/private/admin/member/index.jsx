//@ external lib import
import React, { useMemo, useState } from "react";

//@ MUI lib import
import { TableCell } from "@mui/material";

//@ component import
import CustomTable from "../../../../components/app/table";

//@ util function
import DateFormatter from "../../../../utils/date-time/DateFormatter";

//@ rtk api services & features
import { useAdminMemberListQuery } from "../../../../redux/service/admin/adminMemberService";
import MemberCreateUpdate from "./MemberCreateUpdate";

//@ assign default value
const DEFAULT_MEMBER_VALUES = {
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
const AdminMember = () => {
  /**
   * react local state
   */
  const [modal, setModal] = useState(false);
  const [defaultValues, setDefaultValues] = useState(DEFAULT_MEMBER_VALUES);

  const { data: memberList, isLoading, isError } = useAdminMemberListQuery();

  const renderTableData = useMemo(
    () => memberList?.data || [],
    [memberList?.data]
  );

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
            addTitle: "Member",
          }}
        />

        <MemberCreateUpdate
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

export default AdminMember;
