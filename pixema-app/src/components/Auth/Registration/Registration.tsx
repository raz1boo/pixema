import { Link } from "react-router-dom";
import Input from "../../api/AuthInput/Input";
import Submit from "../../api/AuthInput/Submit";
import Logo from "../../Header/Logo/Logo";
import "./Registration.scss";

const Registration = () => {

  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window">
        <form action="" className="registration-form-window form-window ">
          <h2>Регистрация</h2>
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
          <p>
            У вас уже есть аккаунт? <Link to="/login">Вход</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Registration;

function UseState(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}
