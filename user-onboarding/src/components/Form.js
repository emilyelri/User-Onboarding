import React, {useState, useEffect} from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

function LoginForm( {values, errors, touched, status} ) {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        status && setUsers([...users, status])}, [status]);

    return (
      <>
        <div className="signUp">
            <Form>
            <h2>Join The Team</h2>
            <span>
                {touched.firstName && errors.firstName && <p>{errors.firstName}</p>}
                <Field className="field name" type="text" name="firstName" placeholder="First Name" />
                {touched.lastName && errors.lastName && <p>{errors.lastName}</p>}
                <Field className="field name" type="text" name="lastName" placeholder="Last Name" />
            </span>
            {touched.role && errors.role && <p>{errors.role}</p>}
            <Field className="field" component="select" name="role">
                <option value="Intern">Intern</option>
                <option value="Developer">Developer</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Manager">Manager</option>
            </Field>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field className="field" type="text" name="email" placeholder="Email" />
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field className="field" type="password" name="password" placeholder="Password" />
            {touched.confirmPassword && errors.confirmPassword && <p>{errors.confirmPassword}</p>}
            <Field className="field" type="password" name="confirmPassword" placeholder="Confirm Password" />
            <span className="tos"><Field type="checkbox" name="tos" checked={values.tos}  />  I have read and agreed to the <span className="link">Terms of Service</span>.</span>
            <button type="submit">Sign Up</button>
            </Form>
        </div>
        <div className="registeredUsers">
            <h5>Registered Users:</h5>
            {users.map(user => (
                <p key={user.email}>{`${user.firstName} ${user.lastName}, ${user.role}`}</p>
          ))}
        </div>
      </>
  );
}

const FormikLoginForm = withFormik({

  mapPropsToValues({ firstName, lastName, role, email, password, confirmPassword, tos }) {
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      role: role || "Intern",
      email: email || "",
      password: password || "",
      confirmPassword: confirmPassword || "",
      tos: tos || false
    };
  },

  validationSchema: Yup.object().shape({
    firstName: Yup.string()
        .min(3, "Name must be 3 characters or longer.")
        .required("First name is required."),
    lastName: Yup.string()
        .min(3, "Name must be 3 characters or longer.")
        .required("Last name is required."),
    role: Yup.string()
        .required("You must select a role."),
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

  handleSubmit(values, { resetForm, setSubmitting, setStatus, setErrors }) {
    console.log(values);
    values.email === "waffle@syrup.com"
    ? setErrors({email: "That email is already taken."})

    : axios
    .post("https://reqres.in/api/users", values)
    .then(response => {
        console.log("Success!", response);
        let user = response.data;
        setStatus(user);
        resetForm();
        setSubmitting(false);
        setStatus();
    })
    .catch(error => {
        console.log("Mission failed.", error);
        setSubmitting(false);
    });
  }
})(LoginForm);

export default FormikLoginForm;