import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ModalFilter from "./components/Main/ModalFilter/ModalFilter";
import Settings from "./components/Main/Settings/Settings";
import Home from "./components/Main/Home/Home";
import { IUser } from "./components/types/IUser";
import Registration from "./components/Auth/Registration/Registration";
import Login from "./components/Auth/Login/Login";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import NewPassword from "./components/Auth/NewPassword/NewPassword";
import SelectedMovie from "./components/Main/SelectedMovie/SelectedMovie";
import NotFound from "./components/Main/NotFound/NotFound";
import Footer from "./components/UI/Footer/Footer";
import Header from "./components/UI/Header/Header";
import SelectedPerson from "./components/Main/SelectedPerson/SelectedPerson";
import Favorites from "./components/Main/Favorites/Favorites";
import SearchMoviesResults from "./components/Main/SearchResults/SearchMoviesResults";
import SearchPersonsResults from "./components/Main/SearchResults/SearchPersonsResults";
import FiltersResults from "./components/Main/FilterResults/FilterResults";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "./components/store/hooks/redux";
import MediaQuery from "react-responsive";
import Navbar from "./components/UI/Header/Navbar/Navbar";

function App() {
  const location = useLocation();
  const [dataUser, setDataUser] = useState<IUser>({
    name: "Artem Lapetsky",
    email: "a.lapitsky@gmail.com",
  });
  const [open, setOpen] = useState(false);
  const { theme } = useAppSelector((state) => state.themeReducer);
  document.body.style.backgroundColor = theme === "dark" ? "#000" : "#fff";
  return (
    <>
      {!(
        location.pathname === "/login" ||
        location.pathname === "/registration" ||
        location.pathname === "/new_password" ||
        location.pathname === "/reset_password"
      ) && (
        <Header
          username={dataUser.name}
          onClickLogOut={() => setDataUser({ name: "", email: "" })}
          open={open}
          openFunct={() => setOpen(!open)}
          closeFunction={() => setOpen(false)}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/settings"
          element={<Settings open={open} userData={dataUser} />}
        />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/film/">
          <Route path=":id" element={<SelectedMovie />} />
        </Route>
        <Route path="/name/">
          <Route path=":id" element={<SelectedPerson />} />
        </Route>
        <Route path="/filter" element={<FiltersResults />} />
        <Route path="/search/">
          <Route path="films/:id" element={<SearchMoviesResults />} />
          <Route path="names/:id" element={<SearchPersonsResults />} />
        </Route>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/new_password" element={<NewPassword />} />
        <Route element={<NotFound />} path="*" />
      </Routes>
      <ModalFilter />
      <Footer />
      <MediaQuery maxWidth={768}>
        <Navbar closeBurger={() => setOpen(false)} open={true} />
      </MediaQuery>
    </>
  );
}

export default App;
