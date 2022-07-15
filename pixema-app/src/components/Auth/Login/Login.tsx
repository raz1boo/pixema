import { Link } from "react-router-dom";
import Logo from "../../Header/Logo/Logo";
import "./Login.scss";

const Login = () => {
  return (
    <>
    <div className="login-logo"><Logo/></div>
    <section className="login-window">
      <form action="" className="form-window">
        <h2>Вход</h2>
        <label htmlFor="GET-name">Почта</label>
        <input type="email" name="name" placeholder="Введите почту"/>
        <label htmlFor="GET-name">Пароль</label>
        <input type="password" name="name" placeholder="Введите пароль"/>
        <Link to='/reset'>Забыли пароль?</Link>
        <input className="submit" type="submit" value="Войти" />
        <p>
          У Вас нет аккаунта? <Link to='/registration'>Регистрация</Link>
        </p>
      </form>
    </section>
</>
  );
};

export default Login;