import * as Yup from "yup";

const phoneRegExp =
  /^\s*([+]?[0-9]{1,3}[-\s.]?)?([0-9]{2,4}[-\s.]?){2,3}[0-9]$/;

export const phoneNumberValidationSchema = Yup.object({
  phone: Yup.string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Phone number is required"),
});
