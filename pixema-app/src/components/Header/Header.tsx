import User from "./User/User";
import "./Header.scss";
import Search from "./Search/Search";
import { useState } from "react";
import MediaQuery from "react-responsive";
import Logo from "../Sidebar/Logo/Logo";
import cn from 'classnames';

interface IHeader {
  username: string;
  onClickLogOut: () => void;
}

function Header({ username, onClickLogOut }: IHeader) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MediaQuery maxDeviceWidth={1280}>
      <MediaQuery minDeviceWidth={481}>
        <Logo />
      </MediaQuery>
      </MediaQuery>
      <header className={cn(open&&"burger-menu__open")}>
      <MediaQuery maxDeviceWidth={480}>
        <Logo />
      </MediaQuery>
        <MediaQuery minDeviceWidth={481}>
        <Search />
      </MediaQuery>
        <User
          username={username}
          onClickLogOut={onClickLogOut}
          open={open}
          openFunction={() => setOpen(!open)}
        />
      </header>
        <MediaQuery maxDeviceWidth={480}>
        <Search openMenu={open} />
      </MediaQuery>
    </>
  );
}

export default Header;
