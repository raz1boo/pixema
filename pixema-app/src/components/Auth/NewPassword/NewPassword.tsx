import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./NewPassword.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { useLocation } from "react-router-dom";

const NewPassword = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();
  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window">
        <form
          action=""
          className="form-window new-password-form-window"
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
            Новый пароль
          </h2>
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
