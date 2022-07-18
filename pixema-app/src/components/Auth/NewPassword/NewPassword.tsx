<<<<<<< HEAD
import { Link } from "react-router-dom";
import Input from "../../api/AuthInput/Input";
import Submit from "../../api/AuthInput/Submit";
import Logo from "../../Header/Logo/Logo";
=======
import Logo from "../../UI/Header/Logo/Logo";
>>>>>>> 99449ca7d15372e8b7a9689e867c00b31e2f82e4
import "./NewPassword.scss";

const NewPassword = () => {
  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window">
        <form action="" className="form-window new-password-form-window">
          <h2>Новый пароль</h2>
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
          <Submit className="submit" type="submit" value="Изменить пароль" />
        </form>
      </section>
    </>
  );
};

export default NewPassword;
