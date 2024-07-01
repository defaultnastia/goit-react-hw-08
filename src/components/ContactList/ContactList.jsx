import { memo } from "react";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors.js";
import Contact from "../Contact/Contact";
import HeadingLine from "../HeadingLine/HeadingLine.jsx";
import css from "./ContactList.module.css";

const ContactList = memo(function ContactList({
  handleDeletingContact,
  handleEditingContact,
}) {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <>
      {!filteredContacts.length ? (
        <HeadingLine text="Add your first contact ✍🏻" />
      ) : (
        <ul className={css.list}>
          {filteredContacts?.map((contact) => {
            return (
              <li className={css.contact} key={contact.id}>
                <Contact
                  contact={contact}
                  handleDeletingContact={handleDeletingContact}
                  handleEditingContact={handleEditingContact}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
});

export default ContactList;
