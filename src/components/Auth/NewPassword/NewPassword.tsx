import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./NewPassword.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  useResetPasswordConfirmMutation,
  useResetPasswordMutation,
} from "../../requests/authorization";
import { IAuthorization } from "../../types/IAuthorization";
import { SubmitHandler, useForm } from "react-hook-form";

const NewPassword = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const navigate = useNavigate();
  const location = useLocation();
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const [timer, setTimer] = useState(0);
  const futureResetPassword = JSON.parse(
    localStorage.getItem("futureResetPassword") || '{"email":""}'
  );
  const changeUid = (uid: string) => {
    setUid(uid);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAuthorization>({ mode: "onChange" });

  const onSubmit: SubmitHandler<IAuthorization> = (data) => {
    alert(`your password ${data.password}`);
    alert(`your password ${data.passwordConfirm}`);
    reset();
  };
  const changeToken = (token: string) => {
    setToken(token);
  };
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const changePassword = (password: string) => {
    setPassword(password);
  };
  const changePasswordConfirmation = (passwordConfirmation: string) => {
    setPasswordConfirmation(passwordConfirmation);
  };
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
  const handlerResetPassword = () => {
    resetPasswordConfirm({ uid, token, password });
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
          <Input
            label="Идентификатор пользователя (Uid)"
            type="text"
            name="uid"
            placeholder="Введите uid"
            onChange={changeUid}
            value={uid}
            autoComplete="new-password"
          />
          <Input
            label="Токен"
            type="text"
            name="token"
            placeholder="Введите токен"
            onChange={changeToken}
            value={token}
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
            // autoComplete="new-password"
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
            // onClick={handlerResetPassword}
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
              <span onClick={resendActivation}> Отправить</span>
            )}
          </p>
        </form>
      </section>
    </>
  );
};

export default NewPassword;
