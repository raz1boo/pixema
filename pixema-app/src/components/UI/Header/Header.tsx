import User from "./User/User";
import "./Header.scss";
import Search from "./Search/Search";
import Logo from "./Logo/Logo";
import cn from "classnames";
import Navbar from "./Navbar/Navbar";
import Layout from "../Layout/Layout";
import { useLocation } from "react-router-dom";
import MediaQuery from "react-responsive";

interface IHeader {
  username: string;
  onClickLogOut: () => void;
  open: boolean;
  openFunct: () => void;
  closeFunction: () => void;
}

function Header({
  username,
  onClickLogOut,
  open,
  openFunct,
  closeFunction,
}: IHeader) {
  const location = useLocation();
  return (
    <header
      className={cn(open && "burger-menu__open")}
      style={{
        background:
          location.pathname === "/"
            ? "linear-gradient(180deg, rgba(0, 0, 0, 0.7), transparent)"
            : "transparent",
      }}
    >
      <Layout>
        <MediaQuery minWidth={769}>
          <Navbar
            closeBurger={closeFunction}
            openBurgerFunction={openFunct}
            open={open}
          />
        </MediaQuery>
        <Logo open={open} />
        <MediaQuery minWidth={769}>
          <Search />
        </MediaQuery>
        <User
          username={username}
          onClickLogOut={onClickLogOut}
          openBurger={open}
          openBurgerFunction={openFunct}
          closeBurger={closeFunction}
        />
        <MediaQuery maxWidth={768}>
          <Search />
        </MediaQuery>
      </Layout>
    </header>
  );
}

export default Header;
