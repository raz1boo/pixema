import User from "./User/User";
import "./Header.scss";
import Search from "./Search/Search";
import MediaQuery from "react-responsive";
import Logo from "./Logo/Logo";
import cn from "classnames";
import Navbar from "./Navbar/Navbar";
import Layout from "../Layout/Layout";

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
  return (
    <>
      <header className={cn(open && "burger-menu__open")}>
        <Layout>
          <Navbar
            closeBurger={closeFunction}
            openBurgerFunction={openFunct}
            open={open}
          />
          <Logo />
          <MediaQuery minDeviceWidth={481}>
            <Search />
          </MediaQuery>
          <User
            username={username}
            onClickLogOut={onClickLogOut}
            openBurger={open}
            openBurgerFunction={openFunct}
            closeBurger={closeFunction}
          />
        </Layout>
      </header>
      <MediaQuery maxDeviceWidth={480}>
        <Search />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1280}>
        <Navbar open={open} closeBurger={closeFunction} />
      </MediaQuery>
    </>
  );
}

export default Header;
