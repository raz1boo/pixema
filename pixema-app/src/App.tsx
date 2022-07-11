import { useState } from "react";
import MediaQuery from "react-responsive";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import ModalFilter from "./components/ModalFilter/ModalFilter";
import Settings from "./components/Settings/Settings";
import Sidebar from "./components/Sidebar/Sidebar";

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
      <MediaQuery minDeviceWidth={1281}>
        <Sidebar />
      </MediaQuery>
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
