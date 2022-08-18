import Input from "../AuthInput/Input";
import Submit from "../AuthInput/Submit";
import Logo from "../../UI/Header/Logo/Logo";
import "./ResetPassword.scss";
import { useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../requests/authorization";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILogin } from "../../types/ILogin";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILogin>({ mode: "onChange" });

  const onSubmit: SubmitHandler<ILogin> = (data) => {
    alert(`your email ${data.email}`);
    reset();
  };
  const { theme } = useAppSelector((state) => state.themeReducer);
  const navigate = useNavigate();
   const location = useLocation();
  const [resetPassword] = useResetPasswordMutation();
  const [email, setEmail] = useState("");
  const handlerClick = () => {
    resetPassword(email);
    navigate("/new_password", { replace: true });
    localStorage.setItem(
      "futureResetPassword",
      JSON.stringify({ email: email })
    );
  };
  const changeEmail = (email: string) => {
    setEmail(email);
  };
  return (
    <>
      <div className="login-logo">
        <Logo />
      </div>
      <section className="section-window">
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="form-window reset-password-form-window"
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
            Восстановить пароль
          </h2>
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
            // value={email}
            // onChange={(event) => changeEmail(event.target.value)}
          />

          {errors.email && (
            <div style={{ color: "#ed4337" }}>{errors.email.message}</div>
          )}
          <input
            className="submit"
            type="submit"
            value="Восстановить"
            // onClick={handlerClick}
          />
        </form>
      </section>
    </>
  );
};

export default ResetPassword;
