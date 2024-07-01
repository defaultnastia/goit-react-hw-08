import { useSelector } from "react-redux";
import AuthNav from "../AuthNav/AuthNav";
import Navigation from "../Navigation/Navigation";
import css from ".//AppBar.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selector";
import UserMenu from "../UserMenu/UserMenu";

const AppBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.bar}>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
};

export default AppBar;
