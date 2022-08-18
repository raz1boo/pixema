// import Input from "../AuthInput/Input";
// import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./Login.scss";
import "../../Auth/Authorization.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreateTokenMutation } from "../../requests/authorization";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuthorization } from "../../types/IAuthorization";

const Login = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createToken, { data }] = useCreateTokenMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuthorization>(
    { mode: "onChange" }
  );

  const onSubmit: SubmitHandler<IAuthorization> = (data) => {
    alert(`your email ${data.email}`);
    alert(`your password ${data.password}`);
    reset();
  };

  const changeEmail = (email: string) => {
    setEmail(email);
  };

  const changePassword = (password: string) => {
    setPassword(password);
  };
  const authUser = async () => {
    await createToken({ email, password })
      .unwrap()
      .then((data) => data && navigate("/", { replace: true }));
  };

  useEffect(() => {
    document.cookie = `access=${data ? data?.access : ""}`;
    document.cookie = `refresh=${data ? data?.refresh : ""}`;
  }, [data]);

  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="form-window login-form-window"
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
            Вход
          </h2>
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
            value={email}
            onChange={(event) => changeEmail(event.target.value)}
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
                message: "Пароль должен состоять из букв латинского алфавита (A-z) и арабских цифр (0-9)",
              },
            })}
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(event) => changePassword(event.target.value)}
          />

          {errors.password && (
            <div style={{ color: "#ed4337" }}>{errors.password.message}</div>
          )}

          <Link to="/reset_password">Забыли пароль?</Link>

          <input
            className="submit"
            type="submit"
            value="Войти"
            onClick={authUser}
          />
          <p
            style={{
              color: theme === "dark" ? "#fff" : "#80858b",
            }}
          >
            У Вас нет аккаунта? <Link to="/registration">Регистрация</Link>
          </p>

          {/* <Input
            label="Почта"
            type="email"
            name="email"
            placeholder="Введите почту"
            onChange={changeEmail}
            value={email}
          />
          <Input
            label="Пароль"
            type="password"
            name="password"
            placeholder="Введите пароль"
            value={password}
            onChange={changePassword}
          />
          <Link to="/reset_password">Забыли пароль?</Link>
          <Submit
            className="submit"
            type="submit"
            value="Войти"
            onClick={authUser}
          /> */}
        </form>
      </section>
    </>
  );
};

export default Login;
