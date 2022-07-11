import { useState } from "react";
import MediaQuery from "react-responsive";
// import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Movie from "./components/Main/Movie/Movie";

function App() {
  const [name, setName] = useState("Artem Lapetsky");
  return (
    <>
    <Movie title="The Joker" poster="https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/84934543-5991-4c93-97eb-beb6186a3ad7/300x450" genre="Thriller Crime Drama" rating={9}/>
      {/* <MediaQuery minDeviceWidth={1281}>
        <Sidebar />
      </MediaQuery>
      <Header username={name} onClickLogOut={() => setName("")} /> */}
    </>
  );
}

export default App;
