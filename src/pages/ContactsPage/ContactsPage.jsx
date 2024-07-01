import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from "./ContactsPage.module.css";
import { useEffect, useMemo, useState } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import { Toaster } from "react-hot-toast";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { HashLoader } from "react-spinners";
import HeadingLine from "../../components/HeadingLine/HeadingLine";
import AlertDialogSlide from "../../components/AlertDialogSlide/AlertDialogSlide";

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

  const handleOpenAlert = (isOpen) => {
    isOpen ? setOpenAlert(true) : setOpenAlert(false);
  };

  const handleDeletingContact = useMemo(() => {
    return (id) => {
      handleOpenAlert(true);
      setCurrentContact(id);
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
        <ContactForm />
        <SearchBox />
      </div>
      {!error ? (
        <ContactList handleDeletingContact={handleDeletingContact} />
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
