import { Link, useLocation } from "react-router-dom";
import "./User.scss";
import cn from "classnames";
import { useOutsideClick } from "rooks";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/redux";
import MediaQuery from "react-responsive";
import { authSlice } from "../../../store/reducers/auth.slice";

const User = () => {
  const [menu, openMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => openMenu(false));
  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();
  const { currentUser, isAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const { logout } = authSlice.actions;
  return (
    <div className="user-block">
      {isAuth ? (
        <section
          className="about-user"
          ref={ref}
          onClick={() => openMenu(!menu)}
        >
          <div className="user center">
            <div className="initials center">
              <h2 className="font-size-20px">
                {currentUser?.username.split(" ")[0].split("")[0]}
              </h2>
            </div>
            <MediaQuery minWidth={1025}>
              <div className="username center">
                <h3
                  className="font-size-16px"
                  style={{
                    color:
                      theme === "dark" || location.pathname === "/"
                        ? "#fff"
                        : "#242426",
                  }}
                >
                  {currentUser?.username}
                </h3>
              </div>
            </MediaQuery>
          </div>
          <MediaQuery minWidth={1025}>
            <img
              src="/assets/icons/bottom-arrow.png"
              alt="arrow"
              className={cn("arrow", menu && "arrow-top")}
            />
          </MediaQuery>
        </section>
      ) : (
        <Link to="/login" className="about-user">
          <div className="user center">
            <div className="initials center">
              <h2 className="font-size-20px">
                <img src="/assets/icons/user.png" alt="user" />
              </h2>
            </div>
            <MediaQuery minWidth={1025}>
              <div className="username center">
                <h3
                  className="font-size-16px"
                  style={{
                    color:
                      theme === "dark" || location.pathname === "/"
                        ? "#fff"
                        : "#242426",
                  }}
                >
                  Войти
                </h3>
              </div>
            </MediaQuery>
          </div>
          <MediaQuery minWidth={1025}>
            <img
              src="/assets/icons/right-arrow.png"
              alt="arrow"
              className="arrow-right"
            />
          </MediaQuery>
        </Link>
      )}
      <div
        className={cn("user-modal", menu && "user-modal_open")}
        style={
          theme === "dark" || location.pathname === "/"
            ? { backgroundColor: "#242426", borderColor: "transparent" }
            : { backgroundColor: "#fff", borderColor: "#AFB2B6" }
        }
      >
        <Link
          to="/settings"
          className="font-size-16px"
          style={{
            color:
              theme === "dark" || location.pathname === "/"
                ? "#fff"
                : "#242426",
          }}
        >
          Изменить профиль
        </Link>
        <hr
          style={{
            borderColor:
              theme === "dark" || location.pathname === "/"
                ? "#323537"
                : "#AFB2B6",
          }}
        />
        <p
          onClick={() => {
            dispatch(logout());
            document.cookie = "access=;";
            document.cookie = "refresh=;";
          }}
          className="font-size-16px"
          style={{
            color:
              theme === "dark" || location.pathname === "/"
                ? "#fff"
                : "#242426",
          }}
        >
          Выйти
        </p>
      </div>
    </div>
  );
};

export default User;
