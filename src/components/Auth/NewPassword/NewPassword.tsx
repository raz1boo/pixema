import Logo from "../../UI/Header/Logo/Logo";
import "./NewPassword.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useResetPasswordConfirmMutation,
  useResetPasswordMutation,
} from "../../requests/authorization";
import { SubmitHandler, useForm } from "react-hook-form";
import { IResetPassword } from "../../types/IQuery";

const NewPassword = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);
  const futureResetPassword = JSON.parse(
    localStorage.getItem("futureResetPassword") || '{"email":""}'
  );
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<IResetPassword>({ mode: "onChange" });

  const [resetPassword] = useResetPasswordMutation();
  const resendActivation = () => {
    resetPassword(futureResetPassword.email);
    let count = 60;
    setTimer(count);
    let timerId = setInterval(() => {
      count = count - 1;
      setTimer(count);
    }, 1000);
    setTimeout(() => {
      clearInterval(timerId);
    }, 60000);
  };
  const [resetPasswordConfirm] = useResetPasswordConfirmMutation();
  const onSubmit: SubmitHandler<IResetPassword> = (auth) => {
    resetPasswordConfirm({
      uid: auth?.uid,
      token: auth?.token,
      password: auth?.password,
    });
    navigate("/login", { replace: true });
  };
  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window new-password">
        <p
          style={{
            color: theme === "dark" ? "#fff" : "#242426",
          }}
        >
          На вашу почту <span>{futureResetPassword.email}</span> отправлено
          сообщение с ссылкой. <br />
          (Пример: "https://studapi.teachmeskills.by//password/reset/confirm/
          <span>NEfj</span>/
          <span style={{ color: "#F45D2D" }}>
            bv7k81-f7j78b98a9kfebfa8415970d1360a69j
          </span>
          ") <br /> Из которой <span>фиолетовым</span> цветом отмечен
          Идентификатор пользователя (Uid), а{" "}
          <span style={{ color: "#F45D2D" }}>оранжевым</span> цветом отмечен
          токен
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="form-window new-password-form-window"
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
            Новый пароль
          </h2>
          <label
            style={{
              color: theme === "dark" ? "#fff" : "#242426",
            }}
          >
            Идентификатор пользователя (Uid)
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
            {...register("uid", {
              required: "Uid не может быть пустым",
            })}
            autoComplete="new-password"
            type="text"
            name="uid"
            placeholder="Введите идентификатор пользователя (Uid)"
          />

          {errors?.uid && (
            <div style={{ color: "#ed4337" }}>{errors?.uid?.message}</div>
          )}
          <label
            style={{
              color: theme === "dark" ? "#fff" : "#242426",
            }}
          >
            Токен
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
            {...register("token", {
              required: "Токен не может быть пустым",
            })}
            autoComplete="new-password"
            type="text"
            name="token"
            placeholder="Введите токен"
          />

          {errors?.token && (
            <div style={{ color: "#ed4337" }}>{errors?.token?.message}</div>
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

          {errors.cpassword && (
            <div style={{ color: "#ed4337" }}>{errors.cpassword.message}</div>
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
            Отправить ключ заново?
            {timer !== 0 ? (
              <span> {timer} сек</span>
            ) : (
              <span onClick={resendActivation} style={{ cursor: "pointer" }}>
                {" "}
                Отправить
              </span>
            )}
          </p>
        </form>
      </section>
    </>
  );
};

export default NewPassword;
