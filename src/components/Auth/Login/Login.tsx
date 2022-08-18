import Logo from "../../UI/Header/Logo/Logo";
import "./Login.scss";
import "../../Auth/Authorization.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCreateTokenMutation } from "../../requests/authorization";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateToken } from "../../types/IQuery";

const Login = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const navigate = useNavigate();
  const [createToken, { data }] = useCreateTokenMutation();
  const [error, setError] = useState({ data: { detail: "" } });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ICreateToken>(
    {
      mode: "onChange",
    } //Ошибка срабатывает при изменении
  );

  const onSubmit: SubmitHandler<ICreateToken> = async (auth) => {
    await createToken({ email: auth?.email, password: auth?.password })
      .unwrap()
      .then((data) => data && navigate("/", { replace: true }))
      .catch((error) => setError(error));
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
              color: theme === "dark" ? "#fff" : "#242426",
            }}
          >
            Почта
          </label>
          <input
            style={
              theme === "dark"
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
                  /^(([^<>()[\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Некорректная почта",
              },
            })}
            type="email"
            name="email"
            placeholder="Введите почту"
          />

          {errors?.email && (
            <div style={{ color: "#ed4337" }}>{errors?.email?.message}</div>
          )}

          <label
            style={{
              color: theme === "dark" ? "#fff" : "#242426",
            }}
          >
            Пароль
          </label>
          <input
            style={
              theme === "dark"
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
              minLength: {
                value: 8,
                message: "Минимум 8 символов",
              },
            })}
            name="password"
            type="password"
            placeholder="Введите пароль"
          />

          {errors?.password ? (
            <div style={{ color: "#ed4337" }}>{errors?.password?.message}</div>
          ) : (
            error?.data?.detail ===
              "No active account found with the given credentials" && (
              <div style={{ color: "#ed4337" }}>Неверная почта или пароль</div>
            )
          )}

          <Link to="/reset_password">Забыли пароль?</Link>

          <input
            className="submit"
            type="submit"
            value="Войти"
            disabled={!isValid}
          />
          <p
            style={{
              color: theme === "dark" ? "#fff" : "#80858b",
            }}
          >
            У Вас нет аккаунта? <Link to="/registration">Регистрация</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
