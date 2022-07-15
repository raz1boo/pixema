import { Link } from "react-router-dom";
import Logo from "../../Header/Logo/Logo";
import "./NewPassword.scss";

const NewPassword = () => {
  return (
    <>
      <div className="registration-logo">
        <Logo />
      </div>
      <section className="new-password-window">
        <form action="" className="form-window">
          <h2>Новый пароль</h2>
          <label htmlFor="GET-name">Пароль</label>
          <input type="password" name="name" placeholder="Введите пароль" />
          <label htmlFor="GET-name">Подтверждение пароля</label>
          <input type="password" name="name" placeholder="Повторите пароль" />
          <input className="submit" type="submit" value="Изменить пароль" />
        </form>
      </section>
    </>
  );
};

export default NewPassword;
