import _ from "lodash";
import css from "./Contact.module.css";

const selectDummyAvatar = () => {
  const avatar = _.sample(["🥵", "👹", "😈", "🐟", "🐙", "🐦", "🌚", "🌝"]);
  return avatar;
};

const Contact = ({ contact, handleDeletingContact, handleEditingContact }) => {
  return (
    <div className={css.contactBox}>
      <p className={css.avatar}>{selectDummyAvatar()}</p>
      <div className={css.contactInfo}>
        <p>{contact.name}</p>
        <p>{contact.number}</p>
      </div>
      <div className={css.controls}>
        <button
          className={css.edit}
          onClick={() => {
            handleEditingContact(contact);
          }}
        >
          Edit
        </button>
        <button
          className={css.delete}
          onClick={() => {
            handleDeletingContact(contact);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Contact;
