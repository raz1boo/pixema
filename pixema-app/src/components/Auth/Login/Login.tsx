import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./Login.scss";
import "../../Auth/Authorization.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();
  const navigate = useNavigate();
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
            Вход
          </h2>
          {/* <h3>Ваш пароль успешно изменён!</h3> */}
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
          <Link to="/reset_password">Забыли пароль?</Link>
          <Submit
            className="submit"
            type="submit"
            value="Войти"
            onClick={() => navigate("/", { replace: true })}
          />
          <p
            style={{
              color:
                theme === "dark" || location.pathname === "/"
                  ? "#fff"
                  : "#80858b",
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
