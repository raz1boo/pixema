import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./ResetPassword.scss";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";

// const [isMessageEmail, setMessageEmail] = useState(false);

// const showMessageEmail = () => {
//   setMessageEmail(!isMessageEmail);
// };

// const messageEmail = () => {
//   return (
//     <h3>
//       Мы отправили Вам электронное письмо на почту example@gmail.com со ссылкой
//       для сброса пароля!
//     </h3>
//   );
// };

const ResetPassword = () => {
  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window">
        <form action="" className="form-window reset-password-form-window">
          <h2>Восстановить пароль</h2>
          {/* {setMessageEmail && messageEmail} */}
          <Input
            label="Почта"
            type="email"
            name="email"
            placeholder="Введите почту"
          />
          <Submit
            // onClick={showMessageEmail}
            className="submit"
            type="submit"
            value="Восстановить"
          />
        </form>
      </section>
    </>
  );
};

export default ResetPassword;
