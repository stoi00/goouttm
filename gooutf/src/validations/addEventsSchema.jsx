import * as yup from "yup";

export const addEventsSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Your event name can't have less than 3 letters")
    .max(100, "Your event name can't have more than 40 letters!")
    .required("Event name is a required field!"),

  description: yup
    .string()
    .min(20, "Your description must have at least 20 letters!")
    .max(800, "Your descrpition can't pass past 200 words!")
    .required("Description is a requierd field!"),
  location: yup
    .string()
    .min(5, "Location must have at least 5 letters!")
    .max(200, "Location cna't have more than 50 letters!")
    .required("Location is a required field!"),
  entryFee: yup
    .string()
    .min(1, "Number must be greater than not null!")
    .test(
      "Is positive",
      "The price must be greater or equal to 0!",
      (value) => value >= "0"
    )
    .required("Entery Fee is a requiered field"),
  
  category: yup.number().required("Select a category!"),
});

export const INITAL_FORM_STATE = {
  name: "",
  description: "",
  location: "",
  entryFee: "",
  category: 1,
};
