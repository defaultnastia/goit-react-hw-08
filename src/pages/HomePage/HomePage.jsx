import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selector";
import css from "./HomePage.module.css";

const HomePage = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className={css.home}>
      {isLoggedIn ? (
        <p>🔮 Hello, I am your Phone Book! 🔮</p>
      ) : (
        <p>🍭 Hello, I am a Phone Book, please log in to start! 🍭</p>
      )}
      <iframe
        src="https://giphy.com/embed/WoWm8YzFQJg5i"
        width="480"
        height="350"
        className={css.gif}
      ></iframe>
    </div>
  );
};

export default HomePage;
