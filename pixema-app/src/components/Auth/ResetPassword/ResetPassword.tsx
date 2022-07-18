import Logo from "../../UI/Header/Logo/Logo";
import "./ResetPassword.scss";

const ResetPassword = () => {
  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="reset-window">
        <form action="" className="form-window">
          <h2>Восстановить пароль</h2>
          <h3>
            Мы отправили Вам электронное письмо на почту example@gmail.com со
            ссылкой для сброса пароля!
          </h3>
          <label htmlFor="GET-name">Почта</label>
          <input type="email" name="name" placeholder="Введите почту" />
          <input className="submit" type="submit" value="Восстановить" />
        </form>
      </section>
    </>
  );
};

export default ResetPassword;
