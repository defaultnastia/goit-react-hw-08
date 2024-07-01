import { deleteContact } from "../../redux/contacts/operations.js";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import css from "./Contact.module.css";
import { faker } from "@faker-js/faker";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  return (
    <div className={css.contactBox}>
      <img
        src={faker.image.urlPicsumPhotos({ height: 80, width: 80 })}
        alt="avatar"
      />
      <div className={css.contactInfo}>
        <p>{contact.name}</p>
        <p>{contact.number}</p>
        {/* <button>Add to Call</button> */}
      </div>
      <button
        className={css.delete}
        data-tooltip-id="delete"
        onClick={() => {
          dispatch(deleteContact(contact.id));
        }}
      >
        ❌
      </button>
      <Tooltip id="delete" content="Delete contact" place="right" />
    </div>
  );
};

export default Contact;
