import User from "./User/User";
import "./Header.scss";
import Search from "./Search/Search";
import MediaQuery from "react-responsive";
import Logo from "../Sidebar/Logo/Logo";
import cn from "classnames";
import Navbar from "../Sidebar/Navbar/Navbar";

interface IHeader {
  username: string;
  onClickLogOut: () => void;
  open: boolean;
  openFunct: () => void;
  openModal: () => void;
  closeFunction: () => void;
}

function Header({
  username,
  onClickLogOut,
  open,
  openFunct,
  openModal,
  closeFunction,
}: IHeader) {
  return (
    <>
      <header className={cn(open && "burger-menu__open")}>
        <MediaQuery maxDeviceWidth={1280}>
          <Logo />
        </MediaQuery>
        <MediaQuery minDeviceWidth={481}>
          <Search openModalFilter={openModal} />
        </MediaQuery>
        <User
          username={username}
          onClickLogOut={onClickLogOut}
          openBurger={open}
          openBurgerFunction={openFunct}
          closeBurger={closeFunction}
        />
      </header>
      <MediaQuery maxDeviceWidth={480}>
        <Search openMenu={open} openModalFilter={openModal} />
      </MediaQuery>
      <MediaQuery maxDeviceWidth={1280}>
        <Navbar burger={true} open={open} />
      </MediaQuery>
    </>
  );
}

export default Header;
