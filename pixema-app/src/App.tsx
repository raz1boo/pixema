import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import ModalFilter from "./components/ModalFilter/ModalFilter";
import Settings from "./components/Main/Settings/Settings";
import Home from "./components/Main/Home/Home";
import { IUser } from "./components/types/IUser";
import { useAppSelector } from "./components/store/hooks/redux";
import { useGetNewMoviesQuery } from "./components/api/PixemaAPI";
import { getCurrentDate } from "./components/helpers/getCurrentDate";
import Footer from "./components/Footer/Footer";
import Registration from "./components/Auth/Registration/Registration";
import Login from "./components/Auth/Login/Login";
import ResetPassword from "./components/Auth/ResetPassword/ResetPassword";
import NewPassword from "./components/Auth/NewPassword/NewPassword";

function App() {
  const [dataUser, setDataUser] = useState<IUser>({
    name: "Artem Lapetsky",
    email: "a.lapitsky@gmail.com",
  });
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { limit, type } = useAppSelector((state) => state.loadReducer);
  const { data, isFetching } = useGetNewMoviesQuery({ limit, type });
  const [bgVideo, setBgVideo] = useState(
    localStorage.getItem("bgVideo") || "0"
  );
  const [oldDate, setOldDate] = useState(
    localStorage.getItem("oldDate") || `${getCurrentDate() - 1}`
  );

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let count: number = Math.floor(Math.random() * (max - min)) + min;
    if (count !== 3 && count !== 7 && count !== 8 && count !== 9) {
      return count;
    } else return 0;
  }
  if (oldDate === `${getCurrentDate() - 1}`) {
    setBgVideo(`${getRandomInt(0, 10)}`);
    setOldDate(`${getCurrentDate()}`);
  }
  localStorage.setItem("bgVideo", bgVideo);
  localStorage.setItem("oldDate", oldDate);
  return (
    <div className="root-2">
{ window.location.pathname!==("/login" && '/registration')  &&  <Header
        username={dataUser.name}
        onClickLogOut={() => setDataUser({ name: "", email: "" })}
        open={open}
        openFunct={() => setOpen(!open)}
        openModalFunct={() => setOpenModal(true)}
        closeFunction={() => setOpen(false)}
      />}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              idBigVideo={`${isFetching ? 1219909 : data?.docs[+bgVideo].id}`}
            />
          }
        />
        <Route
          path="/settings"
          element={<Settings open={open} userData={dataUser} />}
        />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/new_password" element={<NewPassword />} />
      </Routes>
      <ModalFilter open={openModal} closeModal={() => setOpenModal(false)} />
      <Footer />
    </div>
  );
}

export default App;

// доделать дизайн мобильной версии по фильтрам и /settings
