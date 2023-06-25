import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Your name can't have less than 3 letters")
    .max(25, "Your name can't have more than 25 letters!")
    .required("Name is a required field!"),
  surname: yup
    .string()
    .max(25, "Your name can't have more than 25 letters!")
    .required("Name is a required field!"),
  age: yup
    .number("Age must be a number!")
    .integer("Number should be positive integer!")
    .test(
      "Is positive",
      "The age must be greater than 0!",
      (value) => value > 0
    )
    .test(
      "Is positive",
      "The age must be lower than 150!",
      (value) => value < 150
    ),
  email: yup
    .string()
    .email("Email is not valid!")
    .min(8, "Email must have at least 8 characters!")
    .max(30, "Email must be less than 30 characters!")
    .required("Email is a required field!"),
  password: yup
    .string()
    .max(30, "Your password can't have more than 30 characters!")
    .min(5, "Password must have at least 8 characters!")
    .max(30, "Password must be less than 30 characters!")
    .required("Password is a required field!"),
});

export const INITAL_FORM_STATE = {
  name: "",
  surname: "",
  age: 1,
  email: "",
  password: "",
};
