import * as Yup from "yup";

const rwandanNumberRegex = /^(\+25)?07[1-9]\d{7}$/;

export const phoneNumberValidationSchema = Yup.object({
  phone: Yup.string()
    .matches(rwandanNumberRegex, "Invalid Rwandan Phone number: ex: 07********")
    .required("Phone number is required"),
});
