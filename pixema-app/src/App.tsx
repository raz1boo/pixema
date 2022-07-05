import { Route, Routes } from 'react-router-dom';
import './App.css';
import Logo from './components/Header/Logo/Logo';
import User from "./components/Header/User/User";

function App() {
  return (
  <>
    <User username="Vladimir Ivanov" initials="VI"/>
    <Logo></Logo>
    </>
  );
}

export default App;
