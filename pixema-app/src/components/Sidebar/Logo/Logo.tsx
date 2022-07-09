import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo = () => {
  return (
    <Link to="/home" className="logo">
      <img src="/pixema.png" alt="logo" />
    </Link>
  );
};

export default Logo;
