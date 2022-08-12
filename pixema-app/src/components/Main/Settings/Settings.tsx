import "./Settings.scss";
import { useEffect, useState } from "react";
import { themeSlice } from "../../store/reducers/theme.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { authSlice } from "../../store/reducers/auth.slice";
import {
  usePatchEmailMutation,
  usePatchPasswordMutation,
  usePatchUserNameMutation,
} from "../../requests/authorization";
import getCookie from "../../helpers/getCookies";
import Layout from "../../UI/Layout/Layout";
import Input from "../../Auth/AuthInput/Input";
import { Link } from "react-router-dom";

const Settings = () => {
  const { setTheme } = themeSlice.actions;
  const { setUser } = authSlice.actions;
  const [patchEmail] = usePatchEmailMutation();
  const [patchPassword] = usePatchPasswordMutation();
  const [patchUserName] = usePatchUserNameMutation();
  const { currentUser, isAuth } = useAppSelector((state) => state.authReducer);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const changeName = (name: string) => {
    setName(name);
  };

  const changeEmail = (email: string) => {
    setEmail(email);
  };

  const changePassword = (password: string) => {
    setPassword(password);
  };
  const changePasswordConfirmation = (passwordConfirmation: string) => {
    setPasswordConfirmation(passwordConfirmation);
  };
  const changeOldPassword = (password: string) => {
    setOldPassword(password);
  };
  const accessCookie = getCookie("access");
  const { theme } = useAppSelector((state) => state.themeReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    localStorage.setItem("theme", theme);
    setEmail(currentUser?.email);
    setName(currentUser?.username);
  }, [theme, currentUser, setEmail, setName]);
  const handlerSave = () => {
    dispatch(setUser({ username: name, id: currentUser?.id, email: email }));
    name !== currentUser?.username &&
      patchUserName({
        username: name,
        id: currentUser?.id,
        token: accessCookie,
      })
        .unwrap()
        .then((username) => console.log("username", username));
    email !== currentUser?.email &&
      patchEmail({ token: accessCookie, email, password })
        .unwrap()
        .then((newEmail) => console.log("newEmail", newEmail));
    oldPassword &&
      passwordConfirmation &&
      password &&
      patchPassword({
        token: accessCookie,
        new_password: password,
        old_password: oldPassword,
      })
        .unwrap()
        .then((newPassword) => console.log("newPassword", newPassword));
  };
  console.log(currentUser);

  return (
    <div className="main-block settings">
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
                    Имя
                  </p>
                  <Input
                    value={name}
                    type="text"
                    name="name"
                    placeholder="Введите имя"
                    onChange={changeName}
                    autoComplete="new-password"
                  />
                </div>
                <div className="profile-form">
                  <p style={{ color: theme === "light" ? "#242426" : "#fff" }}>
                    Почта
                  </p>
                  <Input
                    value={email}
                    type="email"
                    name="email"
                    placeholder="Введите почту"
                    onChange={changeEmail}
                    autoComplete="new-password"
                  />
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
                    <Input
                      value={oldPassword}
                      type="password"
                      name="password"
                      placeholder="Введите пароль"
                      onChange={changeOldPassword}
                      autoComplete="new-password"
                    />
                  </div>
                </div>
                <div className="new-password-block">
                  <div className="password-form">
                    <p
                      style={{ color: theme === "light" ? "#242426" : "#fff" }}
                    >
                      Новый пароль
                    </p>
                    <Input
                      value={password}
                      type="password"
                      name="password"
                      placeholder="Введите новый пароль"
                      onChange={changePassword}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="password-form">
                    <p
                      style={{ color: theme === "light" ? "#242426" : "#fff" }}
                    >
                      Подтвердите пароль
                    </p>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Повторите пароль"
                      onChange={changePasswordConfirmation}
                      autoComplete="new-password"
                      value={passwordConfirmation}
                    />
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
            <button className="footer-button save" onClick={handlerSave}>
              Сохранить
            </button>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default Settings;
