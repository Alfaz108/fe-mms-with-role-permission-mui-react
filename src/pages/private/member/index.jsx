//@ external lib import
import React, { useMemo, useState } from "react";

//@ component import
import CustomTable from "../../../components/app/table";
import ErrorPage from "../../../components/common/ErrorPage";
import LoadingData from "../../../components/common/LoadingData";

//@ util function
import { StatusChangeColor } from "../../../utils/status-change/StatusChangeColor";
import { getURL } from "../../../helpers/qs";

//@ rtk api services & features
import { useMemberListQuery } from "../../../redux/service/member/memberService";

//@ main component
const Member = () => {
  /**
   * react local state
   */

  const [modal, setModal] = useState(false);

  /**
   *   rtk mutation & Query
   */

  //@ member list
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

  /**
   * Show the modal
   */
  const addShowModal = () => {
    setModal(true);
  };

  /**
   * table columns
   */
  const columns = useMemo(
    () => [
      {
        id: "name",
        label: "Name",
        minWidth: 120,
        format: (value) => (value ? value : "n/a"),
        align: "center",
      },
      {
        id: "mobile",
        label: "Mobile",
        minWidth: 120,
        format: (value) => (value ? value : "n/a"),
        align: "center",
      },
      {
        id: "roomNumber",
        label: "Room Number",
        minWidth: 50,
        format: (value) => (value ? value : "n/a"),
        align: "center",
      },
      {
        id: "depositAmount",
        label: "Deposit Amount",
        minWidth: 50,
        format: (value) => (value ? value : "n/a"),
        align: "center",
      },
      {
        id: "mealQuantity",
        label: "Meal Quantity",
        minWidth: 50,
        format: (value) => (value ? value : "n/a"),
        align: "center",
      },
      {
        id: "mealRate",
        label: "Meal Rate",
        minWidth: 50,
        format: (value) => (value ? value : "n/a"),
        align: "center",
      },
      {
        id: "totalCost",
        label: "Total Cost",
        minWidth: 50,
        format: (value) => (value ? value : "n/a"),
        align: "center",
      },
      {
        id: "summaryAmount",
        label: "Summary Amount",
        minWidth: 50,
        format: (value) => (value ? value : "n/a"),
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
   *   table data render
   */

  const renderTableData = useMemo(() => memberList || [], [memberList]);

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
