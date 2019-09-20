import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import '../css/index.css';

function LoginForm( {value, errors, touched} ) {
  return (
    <>
    <div className="signUp">
        <Form>
        <h2>Join The Team</h2>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field className="field" type="name" name="name" placeholder="Full Name" />
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field className="field" type="email" name="email" placeholder="Email" />
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field className="field" type="password" name="password" placeholder="Password" />
        {touched.confirmPassword && errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <Field className="field" type="password" name="confirmPassword" placeholder="Confirm Password" />
        <span className="tos"><Field type="checkbox" name="tos"  />  I have read and agreed to the <span className="link">Terms of Service</span>.</span>
        <button>Sign Up</button>
        </Form>
    </div>
    </>
  );
}

const FormikLoginForm = withFormik({
  mapPropsToValues({ name, email, password, confirmPassword, tos }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string()
        .min(3, "Name must be 3 characters or longer.")
        .required("Full name is required."),
    email: Yup.string()
        .email("Email not valid.")
        .required("Email is required."),
    password: Yup.string()
        .min(8, "Password must be 8 characters or longer.")
        .required("You must enter a password."),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match.")
        .required('You must confirm your password.'),
    tos: Yup.bool()
        .test('tos', "You must accept Terms of Service to sign up.", value => value === true)
  }),

  handleSubmit(values) {
    console.log(values);
    //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
  }
})(LoginForm);

export default FormikLoginForm;