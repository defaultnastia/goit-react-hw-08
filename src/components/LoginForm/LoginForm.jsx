import { useId } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

const initialValues = {
  email: "",
  password: "",
};

const credsValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Please enter a valid email")
    .max(50, "Email should contain maximum 50 letters")
    .required("Please enter email"),
  password: Yup.string()
    .min(7, "Password should contain at least 7 symbols")
    .required("Please enter password"),
});

const LoginForm = () => {
  const emailFieldId = useId();
  const passwordFieldId = useId();

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    values.email = values.email.trim();
    dispatch(login(values));
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

export default LoginForm;
