import { Link, useNavigate } from "react-router-dom";
import Logo from "../../UI/Header/Logo/Logo";
import "./Registration.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { usePostSignUpMutation } from "../../requests/authorization";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISignUp } from "../../types/IQuery";
import { useState } from "react";

const Registration = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const [postSignUp] = usePostSignUpMutation();
  const navigate = useNavigate();
  const [error, setError] = useState({ data: { email: [""], username: [""] } });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<ISignUp>({ mode: "onChange" });

  const onSubmit: SubmitHandler<ISignUp> = (auth) => {
    postSignUp({
      username: auth?.username,
      email: auth?.email,
      password: auth?.password,
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
      })
      .catch((error) => setError(error));
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
              color: theme === "dark" ? "#fff" : "#242426",
            }}
          >
            Логин
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
            {...register("username", {
              required: "Логин не может быть пустым",
              pattern: {
                value: /^\S+$/,
                message: "Некорректный логин",
              },
              minLength: {
                value: 5,
                message: "Минимум 5 символов",
              },
              maxLength: {
                value: 25,
                message: "Максимум 25 символов",
              },
            })}
            autoComplete="new-password"
            type="text"
            name="username"
            placeholder="Введите логин"
          />

          {errors?.username ? (
            <div style={{ color: "#ed4337" }}>{errors?.username?.message}</div>
          ) : (
            error?.data?.username[0] ===
              "A user with that username already exists." && (
              <div style={{ color: "#ed4337" }}>
                Данный логин уже используется
              </div>
            )
          )}

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
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Некорректная почта",
              },
            })}
            type="email"
            name="email"
            placeholder="Введите почту"
          />

          {errors?.email ? (
            <div style={{ color: "#ed4337" }}>{errors?.email?.message}</div>
          ) : (
            error?.data?.email[0] ===
              "user with this Email already exists." && (
              <div style={{ color: "#ed4337" }}>
                Данная почта уже используется
              </div>
            )
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
            autoComplete="new-password"
            type="password"
            placeholder="Введите пароль"
          />

          {errors?.password && (
            <div style={{ color: "#ed4337" }}>{errors?.password?.message}</div>
          )}

          <label
            style={{
              color: theme === "dark" ? "#fff" : "#242426",
            }}
          >
            Подтверждение пароля
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
            {...register("cpassword", {
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
              validate: (value) => {
                const { password } = getValues();
                return password === value || "Пароль не совпадает";
              },
            })}
            autoComplete="new-password"
            name="cpassword"
            type="password"
            placeholder="Подтверждение пароля"
          />

          {errors?.cpassword && (
            <div style={{ color: "#ed4337" }}>{errors?.cpassword?.message}</div>
          )}
          <input
            className="submit"
            type="submit"
            value="Регистрация"
            disabled={!isValid}
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
