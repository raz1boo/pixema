import Input from "../../api/AuthInput/Input";
import Submit from "../../api/AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
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
