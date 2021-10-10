import * as yup from "yup";

export default function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = "Required";
  }
  if (!values.genre) {
    errors.genre = "Required";
  }
  if (!values.dailyRentalRate) {
    errors.dailyRentalRate = "Required";
  }
  if (!values.numberInStock) {
    errors.numberInStock = "Required";
  }

  return errors;
}

export function validationSchema(values) {
  return yup.object({
    title: yup.string("Enter title").required("Title is required"),
    dailyRentalRate: yup
      .string("Enter dailyRentalRate")
      .required("Daily rental rate is required"),
    numberInStock: yup
      .string("Enter numberInStock")
      .required("Number in stock is required"),
    genre: yup.string("Enter genre").required("Genre is required"),
  });
}
