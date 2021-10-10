export default function validate(values) {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  return errors;
}
