import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./ResetPassword.scss";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../requests/authorization";

const ResetPassword = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const [email, setEmail] = useState("");
  const handlerClick = () => {
    resetPassword(email);
    navigate("/new_password", { replace: true });
    localStorage.setItem(
      "futureResetPassword",
      JSON.stringify({ email: email })
    );
  };
  const changeEmail = (email: string) => {
    setEmail(email);
  };
  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window">
        <form
          action=""
          className="form-window reset-password-form-window"
          style={
            theme === "dark"
              ? { backgroundColor: "#242426", borderColor: "transparent" }
              : { backgroundColor: "#fff", borderColor: "#AFB2B6" }
          }
        >
          <h2
            style={{
              color: theme === "dark" ? "#fff" : "#242426",
            }}
          >
            Восстановить пароль
          </h2>
          <Input
            label="Почта"
            type="email"
            name="email"
            placeholder="Введите почту"
            value={email}
            onChange={changeEmail}
          />
          <Submit
            onClick={handlerClick}
            className="submit"
            type="submit"
            value="Восстановить"
          />
        </form>
      </section>
    </>
  );
};

export default ResetPassword;
