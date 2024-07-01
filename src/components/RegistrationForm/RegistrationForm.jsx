import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { register } from "../../redux/auth/operations";
import { useDispatch } from "react-redux";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const credsValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name should contain at least 2 symbols")
    .max(20, "Name should contain maximum 20 symbols")
    .required("Please enter the name"),
  email: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .max(50, "Email should contain maximum 50 symbols")
    .required("Please enter the email"),
  password: Yup.string()
    .min(7, "Password should contain at least 7 symbols")
    .required("Please enter the password"),
});

const RegistrationForm = () => {
  const nameFieldId = useId();
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    values.email = values.email.trim();
    values.name = values.name.trim();
    console.log(values);
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={credsValidationSchema}
    >
      <Form className={css.form}>
        <div className={css.input}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field name="name" id={nameFieldId} />
          <ErrorMessage className={css.error} name="name" component="span" />
        </div>
        <div className={css.input}>
          <label htmlFor={emailFieldId}>Email</label>
          <Field name="email" id={emailFieldId} />
          <ErrorMessage className={css.error} name="email" component="span" />
        </div>
        <div className={css.input}>
          <label htmlFor={passwordFieldId}>Password</label>
          <Field name="password" id={passwordFieldId} type="password" />
          <ErrorMessage
            className={css.error}
            name="password"
            component="span"
          />
        </div>
        <button type="submit">Login</button>
      </Form>
    </Formik>
  );
};

export default RegistrationForm;
