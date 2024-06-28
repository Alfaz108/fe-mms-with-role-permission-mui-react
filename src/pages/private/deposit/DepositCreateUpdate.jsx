//@ external lib import
import React from "react";
import * as yup from "yup";

//@ component import
import CustomModal from "../../../components/app/from/CustomModal";

//@ rtk api services & features

import { useMemberDropdownQuery } from "../../../redux/service/member/memberService";
import { useDepositCreateMutation } from "../../../redux/service/deposit/depositService";

//@ main component
const DepositCreateUpdate = ({
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
  const [depositCreate, { isSuccess, isLoading }] = useDepositCreateMutation();

  //@ member dropdown
  const { data: memberDropdown } = useMemberDropdownQuery();

  /*
   * form validation schema
   */
  const schemaResolver = yup
    .object()
    .shape({
      member: yup.string().required("please select member"),
      depositAmount: yup
        .number()
        .required("please enter deposit amount")
        .typeError("deposit amount must be a number"),
      depositDate: yup.string().required("deposit date is required"),
    })
    .required();

  /*
   *  all input data
   */
  const inputFields = [
    {
      name: "depositDate",
      label: "Deposit Date",
      type: "date",
      placeholder: "Select your deposit date",
      required: true,
      column: { xs: 12, sm: 12, md: 6, lg: 6 },
    },

    {
      name: "depositAmount",
      label: "Deposit Amount",
      type: "number",
      placeholder: "Enter your deposit amount",
      column: { xs: 12, sm: 12, md: 6, lg: 6 },
      required: true,
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
  ];

  /*
   * handle form submission
   */
  const onSubmit = (formData) => {
    formData.depositDate = new Date(formData?.depositDate)?.toISOString();
    depositCreate({ postBody: formData });
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
        title={"Create Member"}
        addTitle={"Add Member"}
        modalID={"MemberCreate"}
        defaultValues={defaultValues}
        schemaResolver={schemaResolver}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default DepositCreateUpdate;
