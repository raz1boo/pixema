import { Link, useNavigate } from "react-router-dom";
import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./Registration.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { useState } from "react";
import { usePostSignUpMutation } from "../../requests/authorization";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { theme } = useAppSelector((state) => state.themeReducer);
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
  const [postSignUp] = usePostSignUpMutation();
  const registerUser = () => {
    postSignUp({
      username: name,
      email: email,
      password: password,
    })
      .unwrap()
      .then((data) => {
        if (data) {
          navigate("/pixema/confirm_registration", { replace: true });
          localStorage.setItem(
            "futureUser",
            JSON.stringify({ email: data.email })
          );
        }
      });
  };

  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window registration">
        <form
          action=""
          className="registration-form-window form-window"
          style={
            theme === "dark"
              ? { backgroundColor: "#242426", borderColor: "transparent" }
              : { backgroundColor: "#fff", borderColor: "#AFB2B6" }
          }
        >
          <h2
            style={{
              color:
                theme === "dark"
                  ? "#fff"
                  : "#242426",
            }}
          >
            Регистрация
          </h2>
          <Input
            label="Логин"
            type="text"
            name="name"
            placeholder="Введите логин"
            onChange={changeName}
            value={name}
            autoComplete="new-password"
          />
          <Input
            label="Почта"
            type="email"
            name="email"
            placeholder="Введите почту"
            onChange={changeEmail}
            value={email}
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            placeholder="Введите пароль"
            onChange={changePassword}
            value={password}
            autoComplete="new-password"
          />
          <Input
            label="Подтверждение пароля"
            type="password"
            name="password"
            placeholder="Повторите пароль"
            onChange={changePasswordConfirmation}
            value={passwordConfirmation}
            autoComplete="new-password"
          />
          <Submit
            className="submit"
            type="submit"
            value="Регистрация"
            onClick={registerUser}
          />
          <p
            style={{
              color:
                theme === "dark"
                  ? "#fff"
                  : "#80858b",
            }}
          >
            У вас уже есть аккаунт? <Link to="/pixema/login">Вход</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Registration;
