import { useId } from "react";
import { addContact, updateContact } from "../../redux/contacts/operations.js";
import { useDispatch } from "react-redux";
import { InputMask } from "@react-input/mask";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import HeadingLine from "../HeadingLine/HeadingLine.jsx";
import css from "./ContactForm.module.css";

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

const ContactForm = ({ editedContact, cancelContactUpdate }) => {
  const initialValues = editedContact
    ? { name: editedContact.name, number: editedContact.number }
    : {
        name: "",
        number: "",
      };

  const dispatch = useDispatch();

  const updateContactLogic = (values) => {
    if (
      values.name === editedContact.name &&
      values.number === editedContact.number
    ) {
      cancelContactUpdate();
      return;
    }

    dispatch(updateContact({ id: editedContact.id, info: values }));
    cancelContactUpdate();
  };

  const handleSubmit = (values, actions) => {
    values.name = values.name.trim();

    editedContact ? updateContactLogic(values) : dispatch(addContact(values));
    cancelContactUpdate;
    actions.resetForm();
  };

  const nameFieldId = useId();
  const phoneFieldId = useId();

  return (
    <div>
      <HeadingLine
        text={editedContact ? "Update contact" : "Add a new contact"}
      />

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={contactValidationSchema}
        enableReinitialize
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

          <div>
            <button type="submit">
              {editedContact ? "Update Contact" : "Add Contact"}
            </button>
            {editedContact && (
              <button className={css.cancel} onClick={cancelContactUpdate}>
                Cancel
              </button>
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
