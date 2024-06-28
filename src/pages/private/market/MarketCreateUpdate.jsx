//@ external lib import
import React from "react";
import * as yup from "yup";

//@ component import
import CustomModal from "../../../components/app/from/CustomModal";

//@ rtk api services & features

import { useMemberDropdownQuery } from "../../../redux/service/member/memberService";
import { useDepositCreateMutation } from "../../../redux/service/deposit/depositService";
import { useMarketCreateMutation } from "../../../redux/service/market/marketService";

//@ main component
const MarketCreateUpdate = ({
  modal,
  setModal,
  defaultValues,
  editData,
  emptyDefaultValue,
}) => {
  /**
   *   rtk mutation & Query
   */
  //@ deposit create
  const [marketCreate, { isSuccess, isLoading }] = useMarketCreateMutation();

  //@ member dropdown
  const { data: memberDropdown } = useMemberDropdownQuery();

  /*
   * form validation schema
   */
  const schemaResolver = yup
    .object()
    .shape({
      member: yup.string().required("please select member"),
      totalPrice: yup
        .number()
        .required("please enter deposit amount")
        .typeError("deposit amount must be a number"),
      marketDate: yup.string().required("deposit date is required"),
    })
    .required();

  /*
   *  all input data
   */
  const inputFields = [
    {
      name: "marketDate",
      label: "Market Date",
      type: "date",
      placeholder: "Select your Market date",
      required: true,
      column: { xs: 12, sm: 12, md: 6, lg: 6 },
    },
    {
      name: "member",
      label: "Member",
      type: "select",
      placeholder: "Select your member",
      options: memberDropdown,
      column: { xs: 12, sm: 12, md: 6, lg: 6 },
      required: true,
    },

    {
      name: "totalPrice",
      label: "Total Price",
      type: "number",
      placeholder: "Enter your Total Price",
      column: { xs: 12, sm: 12, md: 6, lg: 6 },
      required: true,
    },
  ];

  /*
   * handle form submission
   */
  const onSubmit = (formData) => {
    formData.marketDate = new Date(formData?.marketDate)?.toISOString();
    marketCreate({ postBody: formData });
  };

  return (
    <>
      <CustomModal
        modal={modal}
        setModal={setModal}
        inputFields={inputFields}
        isLoading={isLoading}
        isSuccess={isSuccess}
        emptyDefaultValue={emptyDefaultValue}
        size={"xl"}
        title={"Create Market"}
        addTitle={"Add Market"}
        modalID={"MarketCreate"}
        defaultValues={defaultValues}
        schemaResolver={schemaResolver}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default MarketCreateUpdate;
