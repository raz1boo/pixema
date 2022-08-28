import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  useActivateEmailMutation,
  useResendActivateEmailMutation,
} from "../../../requests/authorization";
import { useAppSelector } from "../../../store/hooks/redux";
import { IActivate } from "../../../types/IQuery";
import Logo from "../../../UI/Header/Logo/Logo";
import "./ConfirmRegistration.scss";

const ConfirmRegistration = () => {
  const [timer, setTimer] = useState(0);
  const { theme } = useAppSelector((state) => state.themeReducer);
  const navigate = useNavigate();
  const futureUser = JSON.parse(
    localStorage.getItem("futureUser") || '{"email":""}'
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IActivate>({ mode: "onChange" });
  const [activateEmail] = useActivateEmailMutation();
  const onSubmit: SubmitHandler<IActivate> = (auth) => {
    activateEmail({ uid: auth?.uid, token: auth?.token })
      .unwrap()
      .then((data) => data && navigate("/login", { replace: true }));
  };
  const [resendActivateEmail] = useResendActivateEmailMutation();
  const resendActivation = () => {
    resendActivateEmail(futureUser.email);
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
  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window activation">
        <p
          style={{
            color: theme === "dark" ? "#fff" : "#242426",
          }}
        >
          На вашу почту <span>{futureUser.email}</span> отправлено сообщение с
          ссылкой. <br />
          (Пример: "http://studapi.teachmeskills.by//activate/
          <span>VAjX</span>/
          <span style={{ color: "#F45D2D" }}>
            bg9e21-f3e78r18a9hfevfa8415970d1460a69d
          </span>
          ") <br /> Из которой <span>фиолетовым</span> цветом отмечен
          Идентификатор пользователя (Uid), а{" "}
          <span style={{ color: "#F45D2D" }}>оранжевым</span> цветом отмечен
          токен
        </p>
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
            Активация
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
          <input
            className="submit"
            type="submit"
            value="Активация"
            disabled={!isValid}
          />
          <p
            style={{
              color: theme === "dark" ? "#fff" : "#80858b",
            }}
          >
            У вас уже есть аккаунт? <Link to="/login">Вход</Link>
          </p>
          <p
            style={{
              color: theme === "dark" ? "#fff" : "#80858b",
            }}
          >
            Отправить ключ заново?
            {timer !== 0 ? (
              <span> {timer} сек</span>
            ) : (
              <span onClick={resendActivation} style={{cursor:'pointer'}}> Отправить</span>
            )}
          </p>
        </form>
      </section>
    </>
  );
};

export default ConfirmRegistration;
