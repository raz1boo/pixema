import { useState } from "react";
import MediaQuery from "react-responsive";
// import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  const [name, setName] = useState("Artem Lapetsky");
  return (
    <>
      <MediaQuery minDeviceWidth={1281}>
        <Sidebar />
      </MediaQuery>
      <Header username={name} onClickLogOut={() => setName("")} />
    </>
  );
}

export default App;
