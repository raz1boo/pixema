import Logo from "../../UI/Header/Logo/Logo";
import "./ResetPassword.scss";
import { useAppSelector } from "../../store/hooks/redux";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../requests/authorization";
import { SubmitHandler, useForm } from "react-hook-form";

const ResetPassword = () => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({ mode: "onChange" });

  const onSubmit: SubmitHandler<{ email: string }> = (auth) => {
    resetPassword(auth?.email);
    navigate("/new_password", { replace: true });
    localStorage.setItem(
      "futureResetPassword",
      JSON.stringify({ email: auth?.email })
    );
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
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Некорректная почта",
              },
            })}
            type="email"
            name="email"
            placeholder="Введите почту"
          />
          <div style={{ color: "#ed4337", height: "15px" }}>
            {errors?.email?.message}
          </div>
          <input
            className="submit"
            type="submit"
            value="Восстановить"
            disabled={!isValid}
          />
        </form>
      </section>
    </>
  );
};

export default ResetPassword;
