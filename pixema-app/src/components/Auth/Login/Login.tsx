import { Link } from "react-router-dom";
import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./Login.scss";
import "../../Auth/Authorization.scss";

const Login = () => {
  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window">
        <form action="" className="form-window login-form-window">
          <h2>Вход</h2>
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
          <Submit className="submit" type="submit" value="Войти" />
          <p>
            У Вас нет аккаунта? <Link to="/registration">Регистрация</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
