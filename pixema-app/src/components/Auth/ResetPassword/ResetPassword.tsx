import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./ResetPassword.scss";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import { useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [isMessageEmail, setMessageEmail] = useState(false);
  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();
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
            theme === "dark" || location.pathname === "/"
              ? { backgroundColor: "#242426", borderColor: "transparent" }
              : { backgroundColor: "#fff", borderColor: "#AFB2B6" }
          }
        >
          <h2
            style={{
              color:
                theme === "dark" || location.pathname === "/"
                  ? "#fff"
                  : "#242426",
            }}
          >
            Восстановить пароль
          </h2>
          {isMessageEmail && (
            <h3>
              Мы отправили Вам электронное письмо на почту example@gmail.com со
              ссылкой для сброса пароля!
            </h3>
          )}
          <Input
            label="Почта"
            type="email"
            name="email"
            placeholder="Введите почту"
          />
          <Submit
            onClick={() => setMessageEmail(true)}
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
