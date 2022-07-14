import User from "./User/User";
import "./Header.scss";
import Search from "./Search/Search";
import MediaQuery from "react-responsive";
import Logo from "./Logo/Logo";
import cn from "classnames";
import Navbar from "./Navbar/Navbar";
import Layout from "../Main/Layout/Layout";

interface IHeader {
  username: string;
  onClickLogOut: () => void;
  open: boolean;
  openFunct: () => void;
  openModalFunct: () => void;
  closeFunction: () => void;
}

function Header({
  username,
  onClickLogOut,
  open,
  openFunct,
  openModalFunct,
  closeFunction,
}: IHeader) {
  return (
    <>
      <header className={cn(open && "burger-menu__open")}>
        <Layout>
          <Navbar
            closeBurger={closeFunction}
            openBurgerFunction={openFunct}
            burger={true}
            open={open}
          />
          <Logo />
          <MediaQuery minDeviceWidth={481}>
            <Search openModalFilter={openModalFunct} />
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
        <Search openMenu={open} openModalFilter={openModalFunct} />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1280}>
        <Navbar burger={true} open={open} closeBurger={closeFunction} />
      </MediaQuery>
    </>
  );
}

export default Header;
