import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useActivateEmailMutation,
  useResendActivateEmailMutation,
} from "../../../requests/authorization";
import { useAppSelector } from "../../../store/hooks/redux";
import Logo from "../../../UI/Header/Logo/Logo";
import Input from "../../AuthInput/Input";
import Submit from "../../AuthInput/Submit";
import "./ConfirmRegistration.scss";

const ConfirmRegistration = () => {
  const [uid, setUid] = useState("");
  const [token, setToken] = useState("");
  const [timer, setTimer] = useState(0);
  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();
  const navigate = useNavigate();
  const changeUid = (uid: string) => {
    setUid(uid);
  };
  const changeToken = (token: string) => {
    setToken(token);
  };
  const futureUser = JSON.parse(
    localStorage.getItem("futureUser") || '{"email":""}'
  );
  const [activateEmail] = useActivateEmailMutation();
  const handlerActivateEmail = () => {
    activateEmail({ uid, token })
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
    }, 6000);
  };
  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window activation">
        <p
          style={{
            color:
              theme === "dark" || location.pathname === "/"
                ? "#fff"
                : "#242426",
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
          action=""
          className="registration-form-window form-window"
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
            Активация
          </h2>
          <Input
            label="Идентификатор пользователя (Uid)"
            type="text"
            name="uid"
            placeholder="Введите uid"
            onChange={changeUid}
            value={uid}
          />
          <Input
            label="Токен"
            type="text"
            name="token"
            placeholder="Введите токен"
            onChange={changeToken}
            value={token}
          />
          <Submit
            className="submit"
            type="submit"
            value="Активация"
            onClick={handlerActivateEmail}
          />
          <p
            style={{
              color:
                theme === "dark" || location.pathname === "/"
                  ? "#fff"
                  : "#80858b",
            }}
          >
            У вас уже есть аккаунт? <Link to="/login">Вход</Link>
          </p>
          <p
            style={{
              color:
                theme === "dark" || location.pathname === "/"
                  ? "#fff"
                  : "#80858b",
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

export default ConfirmRegistration;
