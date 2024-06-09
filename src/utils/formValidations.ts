import { LoginProps, LoginErrorProps, RegisterProps, RegisterErrorProps } from "@/types";

export function validateLoginForm(values: LoginProps): LoginErrorProps {
  let errors: LoginErrorProps = {
    errorMessage: "", 
  };

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  } else if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
}

export default  function validateRegisterForm(values: RegisterProps): RegisterErrorProps {
  let errors: RegisterErrorProps = {
    errorMessage: "", 
  };

  if (!values.name) {
    errors.name = "Name is required";
  } else if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  } else if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password needs to be more than 6 characters";
  } else if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm Password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!values.address) {
    errors.address = "Address is required";
  }

  if (!values.phone) {
    errors.phone = "Phone is required";
  } else if (values.phone.length < 10) {
    errors.phone = "Phone needs to be more than 10 characters";
  }

  return errors;
}