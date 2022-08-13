import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./Login.scss";
import "../../Auth/Authorization.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreateTokenMutation } from "../../requests/authorization";

const Login = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createToken, { data }] = useCreateTokenMutation();

  const changeEmail = (email: string) => {
    setEmail(email);
  };

  const changePassword = (password: string) => {
    setPassword(password);
  };
  const authUser = async () => {
    await createToken({ email, password })
      .unwrap()
      .then((data) => data && navigate("/pixema", { replace: true }));
  };

  useEffect(() => {
    document.cookie = `access=${data ? data?.access : ""}`;
    document.cookie = `refresh=${data ? data?.refresh : ""}`;
  }, [data]);
  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window">
        <form
          action=""
          className="form-window login-form-window"
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
            Вход
          </h2>
          {/* <h3>Ваш пароль успешно изменён!</h3> */}
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
            value={password}
            onChange={changePassword}
          />
          <Link to="/reset_password">Забыли пароль?</Link>
          <Submit
            className="submit"
            type="submit"
            value="Войти"
            onClick={authUser}
          />
          <p
            style={{
              color: theme === "dark" ? "#fff" : "#80858b",
            }}
          >
            У Вас нет аккаунта? <Link to="/registration">Регистрация</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
