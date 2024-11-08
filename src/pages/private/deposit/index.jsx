//@ external lib import
import React, { useMemo, useState } from "react";

//@ MUI lib import
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveAsSharpIcon from "@mui/icons-material/SaveAsSharp";

//@ component import
import CustomTable from "../../../components/app/table";
import LoadingData from "../../../components/common/LoadingData";
import ErrorPage from "../../../components/common/ErrorPage";
import DepositCreateUpdate from "./DepositCreateUpdate";

//@ helper and util function
import { convertDropdownDataToObjKey } from "../../../helpers/array-object/convertArrToObjKey";
import { getURL } from "../../../helpers/qs";
import DateFormatter from "../../../utils/date-time/DateFormatter";

//@ rtk api services & features
import { useDepositListQuery } from "../../../redux/service/deposit/depositService";
import { useMemberDropdownQuery } from "../../../redux/service/member/memberService";

//@ assign default value
const DEFAULT_DEPOSIT_VALUES = {
  member: "",
  depositAmount: 0,
  depositDate: new Date(),
};

//@ main component
const Deposit = () => {
  /**
   * react local state
   */
  const [defaultValues, setDefaultValues] = useState(DEFAULT_DEPOSIT_VALUES);
  const [modal, setModal] = useState(false);
  const [editData, setEditData] = useState(false);

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

  //@ deposit list
  const { depositList, isLoading, pagination, isError } = useDepositListQuery(
    getURL(``),
    {
      selectFromResult: (data) => {
        return {
          pagination: data?.data?.pagination,
          depositList: data?.data?.data,
          isLoading: data?.isLoading,
          isError: data?.isError,
        };
      },
    }
  );

  /**
   * show the modal
   */
  const addShowModal = () => {
    setModal(true);
  };

  /**
   * toggle the modal
   */
  const toggle = () => {
    setModal(!modal);
  };

  /**
   *   action column render
   */

  const ActionColumn = ({ value, row }) => {
    const edit = () => {
      toggle();
      let dValues = { ...row };
      setEditData(dValues);
      setDefaultValues(dValues);
    };

    return (
      <>
        <IconButton color="primary">
          {/* onClick={edit} */}
          <SaveAsSharpIcon />
        </IconButton>
        <IconButton sx={{ color: "black" }}>
          <DeleteIcon />
        </IconButton>
      </>
    );
  };

  /**
   * table columns
   */
  const columns = useMemo(
    () => [
      {
        id: "action",
        label: "Action",
        minWidth: 50,
        align: "center",
        renderCell: ActionColumn,
      },
      {
        id: "member",
        label: "Member Name",
        minWidth: 50,
        format: (value) => (value ? memberDropdown?.[value] : "n/a"),
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
        id: "depositDate",
        label: "Deposit Date",
        minWidth: 170,
        format: (value) => (value ? DateFormatter({ date: value }) : "n/a"),
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
    [memberDropdown]
  );

  /**
   *   table data render
   */

  const renderTableData = useMemo(() => depositList || [], [depositList]);

  if (isLoading) {
    return <LoadingData />;
  } else if (isError) {
    return <ErrorPage />;
  } else {
    return (
      <>
        <CustomTable
          columns={columns}
          data={renderTableData}
          addShowModal={addShowModal}
          tableInfo={{
            addTitle: "Deposit",
          }}
          paginationInfo={pagination}
        />

        <DepositCreateUpdate
          {...{
            modal,
            setModal,
            defaultValues,
            editData,
            emptyDefaultValue: DEFAULT_DEPOSIT_VALUES,
          }}
        />
      </>
    );
  }
};

export default Deposit;
