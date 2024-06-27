//@ external lib import
import React, { useEffect, useMemo, useState } from "react";

//@ MUI lib import
import { TableCell, Typography } from "@mui/material";

//@ component import
import CustomTable from "../../../components/app/table";

//@ util function

//@ rtk api services & features
import { useMemberListQuery } from "../../../redux/service/member/memberService";
import { StatusChangeColor } from "../../../utils/status-change/StatusChangeColor";
import LoadingData from "../../../components/common/LoadingData";
import ErrorPage from "../../../components/common/ErrorPage";
import { getURL } from "../../../helpers/qs";
import { useDispatch } from "react-redux";
import { handlePagination } from "../../../redux/features/paginationReducer";

//@ main component
const Member = () => {
  const dispatch = useDispatch();

  /**
   * react local state
   */

  const { memberList, isLoading, pagination, isError } = useMemberListQuery(
    getURL(``),
    {
      selectFromResult: (data) => {
        console.log(data);
        return {
          pagination: data?.data?.pagination,
          memberList: data?.data?.data,
          isLoading: data?.isLoading,
          isError: data?.isError,
        };
      },
    }
  );

  // const {
  //   data: memberList,
  //   isLoading,
  //   pagination,
  //   isError,
  // } = useMemberListQuery();

  console.log(memberList);

  const renderTableData = useMemo(() => memberList || [], [memberList]);

  /**
   * table columns
   */
  const columns = useMemo(
    () => [
      {
        id: "name",
        label: "Name",
        minWidth: 120,
        format: (value) => value,
        align: "center",
      },
      {
        id: "mobile",
        label: "Mobile",
        minWidth: 120,
        format: (value) => value,
        align: "center",
      },
      {
        id: "roomNumber",
        label: "Room Number",
        minWidth: 50,
        format: (value) => value,
        align: "center",
      },
      {
        id: "depositAmount",
        label: "Deposit Amount",
        minWidth: 50,
        format: (value) => value,
        align: "center",
      },
      {
        id: "mealQuantity",
        label: "Meal Quantity",
        minWidth: 50,
        format: (value) => value,
        align: "center",
      },
      {
        id: "mealRate",
        label: "Meal Rate",
        minWidth: 50,
        format: (value) => value,
        align: "center",
      },
      {
        id: "totalCost",
        label: "Total Cost",
        minWidth: 50,
        format: (value) => value,
        align: "center",
      },
      {
        id: "summaryAmount",
        label: "Summary Amount",
        minWidth: 50,
        format: (value) => value,
        align: "center",
      },
      {
        id: "status",
        label: "Status",
        minWidth: 50,
        format: (value) => <StatusChangeColor value={value} />,
        align: "center",
      },
    ],
    []
  );

  /**
   * Show the modal
   */
  const [modal, setModal] = useState(false);
  const addShowModal = () => {
    setModal(true);
  };

  if (isLoading) {
    return (
      <>
        <LoadingData />
      </>
    );
  } else if (isError) {
    return (
      <>
        <ErrorPage />
      </>
    );
  } else {
    return (
      <>
        <CustomTable
          columns={columns}
          data={renderTableData}
          hideBtn={true}
          addShowModal={addShowModal}
          tableInfo={{
            addTitle: "Member",
          }}
          paginationInfo={pagination}
        />
      </>
    );
  }
};

export default Member;
