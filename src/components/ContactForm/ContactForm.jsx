import { useId } from "react";
import { addContact } from "../../redux/contacts/operations.js";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { faker } from "@faker-js/faker";
import { InputMask } from "@react-input/mask";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import css from "./ContactForm.module.css";
import HeadingLine from "../HeadingLine/HeadingLine.jsx";

const initialValues = {
  name: "",
  number: "",
};

const MaskedInput = (props) => (
  <InputMask mask="___-__-__" replacement={{ _: /\d/ }} {...props} />
);

const contactValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(3, "Name should contain at least 3 letters")
    .max(50, "Name should contain maximum 50 letters")
    .required("Please enter contact's name"),
  number: Yup.string()
    .min(9, "Please enter valid phone, example: 111 11 11")
    .required("Please enter contact's phone"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    values.name = values.name.trim();
    dispatch(addContact(values));
    actions.resetForm();
  };

  const nameFieldId = useId();
  const phoneFieldId = useId();

  return (
    <div>
      <HeadingLine text="Add a new contact" />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={contactValidationSchema}
      >
        <Form className={css.addContact} autoComplete="off">
          <label htmlFor={nameFieldId}>Name</label>
          <Field name="name" id={nameFieldId} placeholder="Name Surname" />
          <ErrorMessage className={css.error} name="name" component="span" />
          <label htmlFor={phoneFieldId}>Phone</label>
          <Field
            name="number"
            id={phoneFieldId}
            as={MaskedInput}
            placeholder="000-00-00"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
          <button type="submit">Add Contact</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
