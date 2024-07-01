import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/selectors.js";
import Contact from "../Contact/Contact";
import css from "./ContactList.module.css";
import { memo } from "react";

const ContactList = memo(function ContactList({ handleDeletingContact }) {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <ul className={css.list}>
      {filteredContacts?.map((contact) => {
        return (
          <li className={css.contact} key={contact.id}>
            <Contact
              contact={contact}
              handleDeletingContact={handleDeletingContact}
            />
          </li>
        );
      })}
    </ul>
  );
});

export default ContactList;
