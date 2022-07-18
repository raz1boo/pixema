import { Link } from "react-router-dom";
import Logo from "../../UI/Header/Logo/Logo";
import "./Registration.scss";

const Registration = () => {
  return (
    <>
      <div className="registration-logo">
        <Logo />
      </div>
      <section className="registration-window">
        <form action="" className="form-window">
          <h2>Регистрация</h2>
          <label htmlFor="GET-name">Имя</label>
          <input type="text" name="name" placeholder="Введите имя" />
          <label htmlFor="GET-name">Почта</label>
          <input type="email" name="name" placeholder="Введите почту" />
          <label htmlFor="GET-name">Пароль</label>
          <input type="password" name="name" placeholder="Введите пароль" />
          <label htmlFor="GET-name">Подтверждение пароля</label>
          <input type="password" name="name" placeholder="Повторите пароль" />
          <input className="submit" type="submit" value="Регистрация" />
          <p>
            У вас уже есть аккаунт? <Link to="/login">Вход</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Registration;
