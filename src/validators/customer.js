export default function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.phone) {
    errors.phone = "Required";
  } else if (
    !values.phone.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
  ) {
    errors.phone = "Please enter a valid phone number";
  }
  return errors;
}
