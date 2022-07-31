import { Link, useLocation } from "react-router-dom";
import "./User.scss";
import cn from "classnames";
import { useOutsideClick } from "rooks";
import { useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks/redux";

interface UserProps {
  username: string;
  onClickLogOut: () => void;
  openBurger: boolean;
  openBurgerFunction: () => void;
  closeBurger: () => void;
}

const User = ({
  username,
  onClickLogOut,
  openBurger,
  openBurgerFunction,
  closeBurger,
}: UserProps) => {
  const [menu, openMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => openMenu(false));
  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();
  return (
    <div className="user-block">
      {username ? (
        <section
          className="about-user"
          ref={ref}
          onClick={() => openMenu(!menu)}
        >
          <div className="user center">
            <div className="initials center">
              <h2 className="font-size-20px">
                {username.split(" ")[0].split("")[0] +
                  username.split(" ")[1].split("")[0]}
              </h2>
            </div>
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
                {username}
              </h3>
            </div>
          </div>
          <img
            src="/assets/icons/bottom-arrow.png"
            alt="arrow"
            className={cn("arrow", menu && "arrow-top")}
          />
        </section>
      ) : (
        <Link to="/login" className="about-user">
          <div className="user center">
            <div className="initials center">
              <h2 className="font-size-20px">
                <img src="/assets/icons/user.png" alt="user" />
              </h2>
            </div>
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
          </div>
          <img
            src="/assets/icons/right-arrow.png"
            alt="arrow"
            className="arrow-right"
          />
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
          onClick={onClickLogOut}
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
