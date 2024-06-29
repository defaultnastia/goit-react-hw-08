import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "./redux/contactsOps.js";
import { selectError, selectLoading } from "./redux/contactsSlice.js";
import { Toaster } from "react-hot-toast";
import { HashLoader } from "react-spinners";
import ContactForm from "./components/ContactForm/ContactForm.jsx";
import SearchBox from "./components/SearchBox/SearchBox.jsx";
import ContactList from "./components/ContactList/ContactList.jsx";
import HeadingLine from "./components/HeadingLine/HeadingLine.jsx";

//Loader
const override = {
  display: "block",
  margin: "40px auto",
};

const App = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const loader = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <>
      <div>
        <Toaster />
      </div>
      <HeadingLine text={"📒 Add a New Contact ✍️"} />
      {!error && <ContactForm />}
      <HeadingLine error={error} text={"👽 Contacts From A to Z 🛸"} />
      {!error && <SearchBox />}
      {loader && <HashLoader color="#fff" cssOverride={override} />}
      {!error && !loader && <ContactList />}
    </>
  );
};

export default App;
