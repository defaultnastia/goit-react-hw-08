import HeadingLine from "../../components/HeadingLine/HeadingLine";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <HeadingLine text="Log into your account" />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
