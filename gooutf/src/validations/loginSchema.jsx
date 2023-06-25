import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(8, "Email must have at least 8 characters!")
    .max(30, "Email must be less than 30 characters!")
    .email("Email is not valid!")
    .required("Email is a required field!"),
  password: yup
    .string()
    .min(5, "Password must have at least 8 characters!")
    .max(30, "Password must be less than 30 characters!")
    .required("Password is a required field!"),
});

export const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};