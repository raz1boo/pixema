import { useState } from "react";
import MediaQuery from "react-responsive";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import ModalFilter from "./components/ModalFilter/ModalFilter";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";
import Movie from "./components/Main/Movie/Movie";

interface IUser {
  name: string;
  email: string;
}

function App() {
  const [data, setData] = useState<IUser>({
    name: "Artem Lapetsky",
    email: "a.lapitsky@gmail.com",
  });
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
    <Movie title="The Joker" poster="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/84934543-5991-4c93-97eb-beb6186a3ad7/300x450" genre="Thriller Crime Drama" rating={9}/>
      {/* <MediaQuery minDeviceWidth={1281}>
        <Sidebar />
      </MediaQuery>
<<<<<<< HEAD
      <Header username={name} onClickLogOut={() => setName("")} /> */}
      <div className="second-root__block">
        <Header
          username={data.name}
          onClickLogOut={() => setData({ name: "", email: "" })}
          open={open}
          openFunct={() => setOpen(!open)}
          openModal={() => setOpenModal(true)}
          closeFunction={() => setOpen(false)}
        />
        <Routes>
          <Route
            path="/settings"
            element={<Settings open={open} userData={data} />}
          />
        </Routes>
      </div>
      <ModalFilter open={openModal} closeModal={() => setOpenModal(false)} />

    </>
  );
}

export default App;
