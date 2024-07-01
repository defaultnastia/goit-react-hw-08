import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selector";
import { logout } from "../../redux/auth/operations";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className={css.user}>
      <p>{`Welcome, ${user.name}!`}</p>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
