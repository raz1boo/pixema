import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./Registration.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { useState } from "react";
import { usePostSignUpMutation } from "../../requests/authorization";
import { IAuthorization } from "../../types/IAuthorization";
import { SubmitHandler, useForm } from "react-hook-form";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { theme } = useAppSelector((state) => state.themeReducer);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuthorization>(
    { mode: "onChange" }
  );

  const onSubmit: SubmitHandler<IAuthorization> = (data) => {
    alert(`your login ${data.login}`);
    alert(`your email ${data.email}`);
    alert(`your password ${data.password}`);
    alert(`your password confirm ${data.passwordConfirm}`);
    reset();
  };

  const changeName = (name: string) => {
    setName(name);
  };

  const changeEmail = (email: string) => {
    setEmail(email);
  };

  const changePassword = (password: string) => {
    setPassword(password);
  };

  const changePasswordConfirmation = (passwordConfirmation: string) => {
    setPasswordConfirmation(passwordConfirmation);
  };
  const [postSignUp] = usePostSignUpMutation();
  const registerUser = () => {
    postSignUp({
      username: name,
      email: email,
      password: password,
    })
      .unwrap()
      .then((data) => {
        if (data) {
          navigate("/confirm_registration", { replace: true });
          localStorage.setItem(
            "futureUser",
            JSON.stringify({ email: data.email })
          );
        }
      });
  };

  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window registration">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="registration-form-window form-window"
          style={
            theme === "dark"
              ? { backgroundColor: "#242426", borderColor: "transparent" }
              : { backgroundColor: "#fff", borderColor: "#AFB2B6" }
          }
        >
          <h2
            style={{
              color: theme === "dark" ? "#fff" : "#242426",
            }}
          >
            Регистрация
          </h2>

          <label
            style={{
              color:
                theme === "dark" || location.pathname === "/"
                  ? "#fff"
                  : "#242426",
            }}
          >
            Логин
          </label>
          <input
            style={
              theme === "dark" || location.pathname === "/"
                ? { backgroundColor: "#323537", borderColor: "transparent" }
                : {
                    backgroundColor: "#fff",
                    borderColor: "#AFB2B6",
                    color: "#000",
                  }
            }
            type="text"
            name="name"
            placeholder="Введите логин"
            value={name}
            onChange={(event) => changeName(event.target.value)}
            autoComplete="new-password"
          />

          <label
            style={{
              color:
                theme === "dark" || location.pathname === "/"
                  ? "#fff"
                  : "#242426",
            }}
          >
            Почта
          </label>
          <input
            style={
              theme === "dark" || location.pathname === "/"
                ? { backgroundColor: "#323537", borderColor: "transparent" }
                : {
                    backgroundColor: "#fff",
                    borderColor: "#AFB2B6",
                    color: "#000",
                  }
            }
            {...register("email", {
              required: "Почта не может быть пустой",
              pattern: {
                value:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
                message: "Некорректная почта",
              },
            })}
            type="text"
            placeholder="Введите почту"
            // onChange={(event) => changeEmail(event.target.value)}
            // value={email}
          />

          {errors.email && (
            <div style={{ color: "#ed4337" }}>{errors.email.message}</div>
          )}

          <label
            style={{
              color:
                theme === "dark" || location.pathname === "/"
                  ? "#fff"
                  : "#242426",
            }}
          >
            Пароль
          </label>
          <input
            style={
              theme === "dark" || location.pathname === "/"
                ? { backgroundColor: "#323537", borderColor: "transparent" }
                : {
                    backgroundColor: "#fff",
                    borderColor: "#AFB2B6",
                    color: "#000",
                  }
            }
            {...register("password", {
              required: "Пароль не может быть пустым",
              pattern: {
                value: /(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}/,
                message:
                  "Пароль должен состоять из букв латинского алфавита (A-z) и арабских цифр (0-9)",
              },
            })}
            type="password"
            placeholder="Введите пароль"
            // value={password}
            // onChange={(event) => changePassword(event.target.value)}
          />

          {errors.password && (
            <div style={{ color: "#ed4337" }}>{errors.password.message}</div>
          )}

          <label
            style={{
              color:
                theme === "dark" || location.pathname === "/"
                  ? "#fff"
                  : "#242426",
            }}
          >
            Подтверждение пароля
          </label>
          <input
            style={
              theme === "dark" || location.pathname === "/"
                ? { backgroundColor: "#323537", borderColor: "transparent" }
                : {
                    backgroundColor: "#fff",
                    borderColor: "#AFB2B6",
                    color: "#000",
                  }
            }
            {...register("passwordConfirm", {
              required: "Пароль не может быть пустым",
              pattern: {
                value: / /,
                message: "Пароли должны совпадать",
              },
            })}
            type="password"
            placeholder="Повторите пароль"
            // onChange={(event) => changePasswordConfirmation(event.target.value)}
            // value={passwordConfirmation}
            // autoComplete="new-password"
          />

          {errors.password && (
            <div style={{ color: "#ed4337" }}>{errors.password.message}</div>
          )}

          <input
            className="submit"
            type="submit"
            value="Регистрация"
            onClick={registerUser}
          />
          <p
            style={{
              color: theme === "dark" ? "#fff" : "#80858b",
            }}
          >
            У вас уже есть аккаунт? <Link to="/login">Вход</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Registration;
