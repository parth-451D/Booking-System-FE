import * as Yup from "yup";

export const RegisterSchema = () =>
  Yup.object({
    fullName: Yup.string()
      .required("Full Name is Required")
      .matches(/^\s*\S[\s\S]*$/, "Empty Space Not Allowd"),
    email: Yup.string()
      .email("Enter Valid Email Address")
      .required("Email Required"),
    password: Yup.string()
      .required("Password Required")
      .min(8, "Password should be between 8-15 characters long")
      .max(15, "Password should be between 8-15 characters long")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });


export const LoginSchema = () =>
Yup.object({
  email: Yup.string()
    .email("Enter Valid Email Address")
    .required("Email Required"),
  password: Yup.string()
    .required("Password Required")
    .min(8, "Password should be between 8-15 characters long")
    .max(15, "Password should be between 8-15 characters long")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});