import "./Settings.scss";
import { useEffect, useState } from "react";
import Layout from "../../UI/Layout/Layout";
import { themeSlice } from "../../store/reducers/theme.slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { Link } from "react-router-dom";
import { authSlice } from "../../store/reducers/auth.slice";

const Settings = () => {
  const { setTheme } = themeSlice.actions;
  const { setUser } = authSlice.actions;
  const { currentUser, isAuth } = useAppSelector((state) => state.authReducer);
  const [value, setValue] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });
  const { theme } = useAppSelector((state) => state.themeReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem(
      "user",
      JSON.stringify({ isAuth: isAuth, currentUser: currentUser })
    );
  }, [theme, currentUser, isAuth]);
  const handlerSave = () => {
    dispatch(setUser(value));
  };
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
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={value.name}
                    onChange={(e) =>
                      setValue({ name: e.target.value, email: value.email })
                    }
                    style={
                      theme === "light"
                        ? {
                            borderColor: "#AFB2B6",
                            backgroundColor: "#fff",
                            color: "#242426",
                          }
                        : undefined
                    }
                  />
                </div>
                <div className="profile-form">
                  <p style={{ color: theme === "light" ? "#242426" : "#fff" }}>
                    Почта
                  </p>
                  <input
                    type="text"
                    placeholder="Ваша почта"
                    value={value.email}
                    onChange={(e) =>
                      setValue({ name: value.name, email: e.target.value })
                    }
                    style={
                      theme === "light"
                        ? {
                            borderColor: "#AFB2B6",
                            backgroundColor: "#fff",
                            color: "#242426",
                          }
                        : undefined
                    }
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
                    <input
                      type="text"
                      placeholder="Ваш пароль"
                      style={
                        theme === "light"
                          ? {
                              borderColor: "#AFB2B6",
                              backgroundColor: "#fff",
                              color: "#242426",
                            }
                          : undefined
                      }
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
                    <input
                      type="text"
                      placeholder="Новый пароль"
                      style={
                        theme === "light"
                          ? {
                              borderColor: "#AFB2B6",
                              backgroundColor: "#fff",
                              color: "#242426",
                            }
                          : undefined
                      }
                    />
                  </div>
                  <div className="password-form">
                    <p
                      style={{ color: theme === "light" ? "#242426" : "#fff" }}
                    >
                      Подтвердите пароль
                    </p>
                    <input
                      type="password"
                      placeholder="Подтвердите пароль"
                      style={
                        theme === "light"
                          ? {
                              borderColor: "#AFB2B6",
                              backgroundColor: "#fff",
                              color: "#242426",
                            }
                          : undefined
                      }
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
        <div className="settings-footer">
          <Link to="/" className="footer-button cancel">
            Закрыть
          </Link>
          <button className="footer-button save" onClick={handlerSave}>
            Сохранить
          </button>
        </div>
      </Layout>
    </div>
  );
};

export default Settings;
