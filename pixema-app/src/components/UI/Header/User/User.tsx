import { Link } from "react-router-dom";
import "./User.scss";
import cn from "classnames";
import { useOutsideClick } from "rooks";
import { useRef, useState } from "react";
import MediaQuery from "react-responsive";

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
  closeBurger
}: UserProps) => {
  const [menu, openMenu] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => openMenu(false));
  const ref1 = useRef<HTMLDivElement>(null);
  useOutsideClick(ref1, closeBurger);
  return (
    <>
      <MediaQuery minDeviceWidth={1281}>
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
                  <h3 className="font-size-16px">{username}</h3>
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
                  <h3 className="font-size-16px">Sign In</h3>
                </div>
              </div>
              <img
                src="/assets/icons/right-arrow.png"
                alt="arrow"
                className="arrow-right"
              />
            </Link>
          )}
          <div className={cn("user-modal", menu && "user-modal_open")}>
            <Link to="/settings" className="font-size-16px">
              Edit Profile
            </Link>
            <hr />
            <p onClick={onClickLogOut} className="font-size-16px">
              Log Out
            </p>
          </div>
        </div>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1280}>
        <div
          className={cn(
            "burger-menu__button",
            openBurger && "burger-menu__open"
          )}
          onClick={openBurgerFunction}
          ref={ref1}
        >
          <div className={cn("burger", openBurger && "x")}>
            <div className="burger-menu__lines"></div>
            <div className="burger-menu__lines"></div>
            <div className="burger-menu__lines"></div>
          </div>
        </div>
      </MediaQuery>
    </>
  );
};

export default User;
