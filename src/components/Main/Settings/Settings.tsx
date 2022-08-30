import "./Settings.scss";
import { useEffect, useState } from "react";
import { themeSlice } from "../../store/reducers/theme.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { authSlice } from "../../store/reducers/auth.slice";
import {
  usePatchPasswordMutation,
  usePatchUserNameMutation,
} from "../../requests/authorization";
import getCookie from "../../helpers/getCookies";
import Layout from "../../UI/Layout/Layout";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ISignUp } from "../../types/IQuery";

const Settings = () => {
  const { setTheme } = themeSlice.actions;
  const { setUser } = authSlice.actions;
  const [error, setError] = useState({ data: { username: [""] } });
  const [passwordError, setPasswordError] = useState({
    data: { new_password: [""], current_password: [""], patch_password: [""] },
  });
  const [patchPassword] = usePatchPasswordMutation();
  const [patchUserName] = usePatchUserNameMutation();
  const { currentUser, isAuth } = useAppSelector((state) => state.authReducer);
  const accessCookie = getCookie("access");
  const { theme } = useAppSelector((state) => state.themeReducer);
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<ISignUp>({
    mode: "onBlur",
    defaultValues: {
      username: currentUser?.username,
    },
  });
  const settingsStyle = {
    height: "100%",
  };
  const handlerSave = () => {
    const { username, password, npassword, cpassword } = getValues();
    dispatch(
      setUser({
        username: username,
        id: currentUser?.id,
        email: currentUser?.email,
      })
    );
    username !== currentUser?.username &&
      patchUserName({
        username: username,
        id: currentUser?.id,
        token: accessCookie,
      })
        .unwrap()
        .then((data) =>
          setError({ data: { username: ["Логин успешно изменён"] } })
        )
        .catch((error) => 
          setError(error)
        );
    cpassword ===
      npassword &&
      (password
        ? patchPassword({
            token: accessCookie,
            new_password: npassword,
            current_password: password,
          })
            .unwrap()
            .then((data) =>
              setPasswordError({
                data: {
                  new_password: [""],
                  current_password: [""],
                  patch_password: ["Пароль успешно изменён"],
                },
              })
            )
            .catch((error) => setPasswordError(error))
        : setPasswordError({
            data: {
              new_password: [""],
              current_password: ["Введите пароль"],
              patch_password: [""],
            },
          }));
    reset();
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    reset({ username: currentUser?.username });
  }, [theme, reset, currentUser]);
  return (
    <div
      className="main-block settings"
      style={isAuth ? undefined : settingsStyle}
    >
      <Layout>
        {isAuth && (
          <>
            <div className="profile">
              <h2 style={{ color: theme === "light" ? "#242426" : "#fff" }}>
                Профиль
              </h2>
              <div
                className="changes-block"
                style={
                  theme === "light"
                    ? { borderColor: "#AFB2B6", backgroundColor: "#fff" }
                    : undefined
                }
              >
                <div className="profile-form">
                  <p style={{ color: theme === "light" ? "#242426" : "#fff" }}>
                    Логин
                  </p>
                  <input
                    style={
                      theme === "dark"
                        ? {
                            backgroundColor: "#323537",
                            borderColor: "transparent",
                          }
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
                    <div style={{ color: "#ed4337" }}>
                      {errors?.username?.message}
                    </div>
                  ) : error?.data?.username[0] ===
                    "A user with that username already exists." ? (
                    <div style={{ color: "#ed4337" }}>
                      Данный логин уже используется
                    </div>
                  ) : error?.data?.username[0] ===
                    "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters." ? (
                    <div style={{ color: "#ed4337" }}>
                      Введите действительное имя пользователя. Это значение
                      может содержать только буквы, цифры и символы @ . + - _
                    </div>
                  ) : (
                    error?.data?.username[0] === "Логин успешно изменён" && (
                      <div style={{ color: "#00A340" }}>
                        {error?.data?.username[0]}
                      </div>
                    )
                  )}
                </div>
                <div className="profile-form">
                  <p style={{ color: theme === "light" ? "#242426" : "#fff" }}>
                    Почта
                  </p>
                  <div
                    className="profile-form__email"
                    style={
                      theme === "dark"
                        ? {
                            backgroundColor: "#323537",
                            borderColor: "transparent",
                          }
                        : {
                            backgroundColor: "#fff",
                            borderColor: "#AFB2B6",
                            color: "#000",
                          }
                    }
                  >
                    {currentUser?.email}
                  </div>
                </div>
              </div>
            </div>
            <div className="password">
              <h2 style={{ color: theme === "light" ? "#242426" : "#fff" }}>
                Пароль
              </h2>
              <div
                className="changes-block"
                style={
                  theme === "light"
                    ? { borderColor: "#AFB2B6", backgroundColor: "#fff" }
                    : undefined
                }
              >
                <div className="old-password-block">
                  <div className="password-form">
                    <p
                      style={{ color: theme === "light" ? "#242426" : "#fff" }}
                    >
                      Пароль
                    </p>
                    <input
                      style={
                        theme === "dark"
                          ? {
                              backgroundColor: "#323537",
                              borderColor: "transparent",
                            }
                          : {
                              backgroundColor: "#fff",
                              borderColor: "#AFB2B6",
                              color: "#000",
                            }
                      }
                      {...register("password", {
                        pattern: {
                          value: /(?=.*[0-9])(?=.*[a-zA-Z]).{8,30}/,
                          message:
                            "Пароль должен состоять из букв латинского алфавита (A-z) и арабских цифр (0-9)",
                        },
                        validate: (value) => {
                          value &&
                            setPasswordError({
                              data: {
                                new_password: [""],
                                current_password: [""],
                                patch_password: [""],
                              },
                            });
                          return true;
                        },
                      })}
                      autoComplete="new-password"
                      type="password"
                      placeholder="Введите пароль"
                    />

                    {errors?.password ? (
                      <div style={{ color: "#ed4337" }}>
                        {errors?.password?.message}
                      </div>
                    ) : passwordError?.data?.current_password?.[0] ===
                      "Invalid password." ? (
                      <div style={{ color: "#ed4337" }}>Неверный пароль</div>
                    ) : passwordError?.data?.current_password?.[0] ===
                      "Введите пароль" ? (
                      <div style={{ color: "#ed4337" }}>
                        {passwordError?.data?.current_password?.[0]}
                      </div>
                    ) : (
                      <div style={{ color: "#00A340" }}>
                        {passwordError?.data?.patch_password?.[0]}
                      </div>
                    )}
                  </div>
                </div>
                <div className="new-password-block">
                  <div className="password-form">
                    <p
                      style={{ color: theme === "light" ? "#242426" : "#fff" }}
                    >
                      Новый пароль
                    </p>
                    <input
                      style={
                        theme === "dark"
                          ? {
                              backgroundColor: "#323537",
                              borderColor: "transparent",
                            }
                          : {
                              backgroundColor: "#fff",
                              borderColor: "#AFB2B6",
                              color: "#000",
                            }
                      }
                      {...register("npassword", {
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
                          value &&
                            setPasswordError({
                              data: {
                                new_password: [""],
                                current_password: [""],
                                patch_password: [""],
                              },
                            });
                          return true;
                        },
                      })}
                      autoComplete="new-password"
                      type="password"
                      placeholder="Введите пароль"
                    />

                    {errors?.npassword ? (
                      <div style={{ color: "#ed4337" }}>
                        {errors?.npassword?.message}
                      </div>
                    ) : (
                      passwordError?.data?.new_password?.[0] ===
                        "This password is too common." && (
                        <div style={{ color: "#ed4337" }}>
                          Этот пароль слишком распространен
                        </div>
                      )
                    )}
                  </div>
                  <div className="password-form">
                    <p
                      style={{ color: theme === "light" ? "#242426" : "#fff" }}
                    >
                      Подтвердите пароль
                    </p>
                    <input
                      style={
                        theme === "dark"
                          ? {
                              backgroundColor: "#323537",
                              borderColor: "transparent",
                            }
                          : {
                              backgroundColor: "#fff",
                              borderColor: "#AFB2B6",
                              color: "#000",
                            }
                      }
                      {...register("cpassword", {
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
                          const { npassword } = getValues();
                          return npassword === value || "Пароль не совпадает";
                        },
                      })}
                      autoComplete="new-password"
                      name="cpassword"
                      type="password"
                      placeholder="Подтверждение пароля"
                    />

                    {errors?.cpassword && (
                      <div style={{ color: "#ed4337" }}>
                        {errors?.cpassword?.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="theme">
          <h2 style={{ color: theme === "light" ? "#242426" : "#fff" }}>
            Тема
          </h2>
          <div
            className="changes-block"
            style={
              theme === "light"
                ? { borderColor: "#AFB2B6", backgroundColor: "#fff" }
                : undefined
            }
          >
            <div className="description">
              <p style={{ color: theme === "light" ? "#242426" : "#fff" }}>
                {theme === "dark" ? "Тёмная тема" : "Светлая тема"}
              </p>
              <p>
                {theme === "dark"
                  ? "Используется тёмная тема"
                  : "Используется светлая тема"}
              </p>
            </div>
            <div className="switch">
              <input
                id="toggle"
                className="toggle toggle-round"
                type="checkbox"
                checked={theme === "dark"}
                onChange={() =>
                  dispatch(setTheme(theme === "dark" ? "light" : "dark"))
                }
              />
              <label htmlFor="toggle"></label>
            </div>
          </div>
        </div>
        {isAuth && (
          <div className="settings-footer">
            <Link to="/" className="footer-button cancel">
              Закрыть
            </Link>
            <button
              className="footer-button save"
              onClick={handlerSave}
              disabled={
                errors?.cpassword ||
                errors?.npassword ||
                errors?.username ||
                passwordError?.data?.current_password?.[0] ||
                passwordError?.data?.new_password?.[0]
                  ? true
                  : false
              }
            >
              Сохранить
            </button>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Settings;
