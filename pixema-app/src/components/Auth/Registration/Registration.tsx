import { Link, useLocation } from "react-router-dom";
import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./Registration.scss";
import { useAppSelector } from "../../store/hooks/redux";

const Registration = () => {
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
          className="registration-form-window form-window"
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
            Регистрация
          </h2>
          <Input
            label="Имя"
            type="text"
            name="name"
            placeholder="Введите имя"
          />
          <Input
            label="Почта"
            type="email"
            name="email"
            placeholder="Введите почту"
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            placeholder="Введите пароль"
          />
          <Input
            label="Подтверждение пароля"
            type="password"
            name="password"
            placeholder="Повторите пароль"
          />
          <Submit className="submit" type="submit" value="Регистрация" />
          <p
            style={{
              color:
                theme === "dark" || location.pathname === "/"
                  ? "#fff"
                  : "#80858b",
            }}
          >
            У вас уже есть аккаунт? <Link to="/login">Вход</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Registration;
