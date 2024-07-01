import { useDispatch, useSelector } from "react-redux";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import css from "./ContactsPage.module.css";
import { useEffect } from "react";
import { fetchContacts } from "../../redux/contacts/operations";
import { Toaster } from "react-hot-toast";
import { selectError, selectLoading } from "../../redux/contacts/selectors";
import { HashLoader } from "react-spinners";
import HeadingLine from "../../components/HeadingLine/HeadingLine";

//Loader
const override = {
  display: "block",
  margin: "40px auto",
};

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className={css.controls}>
        <ContactForm />
        <SearchBox />
      </div>
      {!error ? <ContactList /> : <HeadingLine error={error} />}
      {loading && <HashLoader color="#F95738" cssOverride={override} />}
    </div>
  );
};

export default ContactsPage;
