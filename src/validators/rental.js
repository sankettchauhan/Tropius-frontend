import * as yup from "yup";

export default function validationSchema(values) {
  return yup.object({
    customer: yup.string("Enter customer").required("Please select a customer"),
    movie: yup.string("Enter movie").required("Please select a movie"),
  });
}
