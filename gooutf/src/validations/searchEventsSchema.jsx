import * as yup from "yup";

export const searchEventsSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "The searched element can't have less than 3 letters")
    .max(100, "The searched element can't have more than 40 letters!")
    .required("Keyword is a required field!")
    //.required("Event name is a required field!"),

});

export const INITAL_FORM_STATE = {
  name: "",
  category: 1,
};