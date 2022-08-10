import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./Registration.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { useState } from "react";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();
  const navigate = useNavigate();

  const changeName = (name: string) => {
    setName(name);
  };

  const changeEmail = (email: string) => {
    setEmail(email);
  };

  const changePassword = (password: string) => {
    setPassword(password);
  };

  const changePasswordConfirmation = (passwordConfirmation: string) => {
    setPasswordConfirmation(passwordConfirmation);
  };

  const registerUser = () => {
    fetch("https://studapi.teachmeskills.by/auth/users/", {
      method: "POST",
      body: JSON.stringify({
        username: name,
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

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
            onChange={changeName}
          />
          <Input
            label="Почта"
            type="email"
            name="email"
            placeholder="Введите почту"
            onChange={changeEmail}
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            placeholder="Введите пароль"
            onChange={changePassword}
          />
          <Input
            label="Подтверждение пароля"
            type="password"
            name="password"
            placeholder="Повторите пароль"
            onChange={changePasswordConfirmation}
          />
          <Submit
            className="submit"
            type="submit"
            value="Регистрация"
            onClick={() => {
              navigate("/", { replace: true });
              registerUser();
            }}
          />
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
