import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage/HomePage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import { useDispatch, useSelector } from "react-redux";
import { selectIsRefreshing } from "./redux/auth/selector";
import { useEffect } from "react";
import { refreshUser } from "./redux/auth/operations";
import RestrictedRoute from "./components/RestrictedRoute";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <p>Refreshing</p>
  ) : (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<RegistrationPage />}
              />
            }
          ></Route>
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          ></Route>
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          ></Route>
        </Routes>
      </Layout>
    </>
  );
};

export default App;
