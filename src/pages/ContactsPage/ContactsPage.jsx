import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { HashLoader } from "react-spinners";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import HeadingLine from "../../components/HeadingLine/HeadingLine";
import AlertDialogSlide from "../../components/AlertDialogSlide/AlertDialogSlide";
import SearchBox from "../../components/SearchBox/SearchBox";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import css from "./ContactsPage.module.css";

//Loader
const override = {
  display: "block",
  margin: "40px auto",
};

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [openAlert, setOpenAlert] = useState(false);
  const [currentContact, setCurrentContact] = useState(null);
  const [editedContact, setEditedContact] = useState();

  const handleOpenAlert = (isOpen) => {
    isOpen ? setOpenAlert(true) : setOpenAlert(false);
  };

  const cancelContactUpdate = () => {
    setEditedContact();
  };

  const handleDeletingContact = useMemo(() => {
    return (contact) => {
      handleOpenAlert(true);
      setCurrentContact(contact);
      cancelContactUpdate();
    };
  }, []);

  const handleEditingContact = useMemo(() => {
    return (contact) => {
      setEditedContact(contact);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <Toaster />

      <AlertDialogSlide
        openAlert={openAlert}
        handleOpenAlert={handleOpenAlert}
        currentContact={currentContact}
      />

      <div className={css.controls}>
        <ContactForm
          editedContact={editedContact}
          handleEditingContact={handleEditingContact}
          cancelContactUpdate={cancelContactUpdate}
        />
        <SearchBox />
      </div>

      {!error ? (
        <ContactList
          handleDeletingContact={handleDeletingContact}
          handleEditingContact={handleEditingContact}
        />
      ) : (
        <HeadingLine error={error} />
      )}

      {loading && !error && (
        <HashLoader color="#F95738" cssOverride={override} />
      )}
    </div>
  );
};

export default ContactsPage;
