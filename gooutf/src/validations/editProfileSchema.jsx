import * as yup from "yup";

export const editProfileSchema = yup.object().shape({
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
});
