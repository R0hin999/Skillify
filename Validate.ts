interface data {
  username?: string;
  email?: string;
  password?: string;
}
const validate = (values: data) => {
  const errors: data = {};
  if (!values.username) {
    errors.username = "Username is required";
  } else if (values.username.length > 50) {
    errors.username = "Username must be 50 characters or less";
  } else if (values.username.length < 3) {
    errors.username = "Username must be 3 characters or more";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (
    !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+](?=.*\d){6,}/.test(
      values.password
    )
  ) {
    errors.password =
      "Password must contains 1 uppercase, 1 lowercase, 1 special symbol,1 number and must be characters long";
  }
  return errors;
};
export default validate;
