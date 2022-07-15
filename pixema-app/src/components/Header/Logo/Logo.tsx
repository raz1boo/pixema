import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img src="/pixema.png" alt="logo" />
    </Link>
  );
};

export default Logo;
