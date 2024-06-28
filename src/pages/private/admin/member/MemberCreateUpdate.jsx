//@ external lib import
import React from "react";
import * as yup from "yup";

//@ component import
import CustomModal from "../../../../components/app/from/CustomModal";

//@ enum import
import statusEnums from "../../../../constants/enums/status.enums";
import { useMemberCreateMutation } from "../../../../redux/service/member/memberService";

//@ main component
const MemberCreateUpdate = ({
  modal,
  setModal,
  defaultValues,
  emptyDefaultValue,
}) => {
  const [memberCreate, { isSuccess, isLoading }] = useMemberCreateMutation();
  /*
   * form validation schema
   */
  const schemaResolver = yup
    .object()
    .shape({
      name: yup.string().required("please enter your name"),
      roomNumber: yup.string().required("please enter your room number"),
      mobile: yup.string().required("please enter your mobile number"),
      status: yup.string().required(" status is required"),
    })
    .required();

  /*
   *  all input data
   */
  const inputFields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      column: { xs: 12, sm: 12, md: 6, lg: 6 },
      required: true,
    },
    {
      name: "mobile",
      label: "mobile",
      type: "tel",
      placeholder: "Enter your mobile",
      column: { xs: 12, sm: 12, md: 6, lg: 6 },
      required: true,
    },

    {
      name: "roomNumber",
      label: "Room Number",
      type: "text",
      placeholder: "Enter your room number",
      column: { xs: 12, sm: 12, md: 6, lg: 6 },
      required: true,
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      placeholder: "Select your status",
      options: statusEnums,
      column: { xs: 12, sm: 12, md: 6, lg: 6 },
      required: true,
    },
  ];

  /*
   * handle form submission
   */
  const onSubmit = (formData) => {
    formData.depositAmount = 0;
    formData.mealQuantity = 0;
    formData.mealRate = 0;
    formData.totalCost = 0;
    formData.summaryAmount = 0;
    memberCreate({ postBody: formData });
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

export default MemberCreateUpdate;
