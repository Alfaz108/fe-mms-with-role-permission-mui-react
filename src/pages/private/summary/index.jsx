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
import { useSummaryListQuery } from "../../../redux/service/summary/summaryService";
import { useMemberDropdownQuery } from "../../../redux/service/member/memberService";
import { convertDropdownDataToObjKey } from "../../../helpers/array-object/convertArrToObjKey";
import formatNumber from "../../../helpers/numberFormater";

//@ main component
const Summary = () => {
  /**
   * react local state
   */

  const [modal, setModal] = useState(false);

  /**
   *   rtk mutation & Query
   */

  //@ member dropdown
  const { memberDropdown } = useMemberDropdownQuery(undefined, {
    selectFromResult: ({ data }) => {
      const memberDropdown = convertDropdownDataToObjKey(data);
      return { memberDropdown };
    },
  });

  //@ summary list
  const { summaryList, isLoading, pagination, isError } = useSummaryListQuery(
    getURL(``),
    {
      selectFromResult: (data) => {
        console.log(data);
        return {
          pagination: data?.data?.pagination,
          summaryList: data?.data?.data,
          isLoading: data?.isLoading,
          isError: data?.isError,
        };
      },
    }
  );

  /**
   * table columns
   */
  const columns = useMemo(
    () => [
      {
        id: "member",
        label: "Member Name",
        minWidth: 50,
        format: (value) => (value ? memberDropdown?.[value] : "n/a"),
        align: "center",
      },
      {
        id: "mealRate",
        label: "Meal Rate",
        minWidth: 120,
        format: (value) => (value ? formatNumber(value) : 0),
        align: "center",
      },
      {
        id: "mealQuantity",
        label: "Meal Quantity",
        minWidth: 50,
        format: (value) => (value ? value : 0),
        align: "center",
      },
      {
        id: "depositAmount",
        label: "Deposit Amount",
        minWidth: 50,
        format: (value) => (value ? value : 0),
        align: "center",
      },
      {
        id: "totalCost",
        label: "Total Cost",
        minWidth: 50,
        format: (value) => (value ? formatNumber(value) : 0),
        align: "center",
      },
      {
        id: "summaryAmount",
        label: "Summary Amount",
        minWidth: 50,
        format: (value) => (value ? formatNumber(value) : 0),
        align: "center",
      },
    ],
    [memberDropdown]
  );

  /**
   *   table data render
   */

  const renderTableData = useMemo(() => summaryList || [], [summaryList]);

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
          paginationInfo={pagination}
        />
      </>
    );
  }
};

export default Summary;
