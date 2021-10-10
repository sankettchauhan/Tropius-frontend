import * as yup from "yup";

export default function validationSchema(values) {
  return yup.object({
    customerId: yup
      .string("Enter customer id")
      .required("Please select a customer"),
    movieId: yup.string("Enter movie id").required("Please select a movie"),
  });
}
