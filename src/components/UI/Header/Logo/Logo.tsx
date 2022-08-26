import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks/redux";
import "./Logo.scss";

interface ILogo {
  open?: boolean;
}

const Logo = ({ open }: ILogo) => {
  const { theme } = useAppSelector((state) => state.themeReducer);
  const location = useLocation();
  return (
    <Link to="/" className="logo">
      {theme === "dark" || location.pathname === "/" || open ? (
        <img
          src="/pixema.png"
          alt="logo"
          style={{ height: "40px", width: "158px" }}
        />
      ) : (
        <img
          src="/pixema-light.png"
          alt="logo"
          style={{ height: "40px", width: "158px" }}
        />
      )}
    </Link>
  );
};

export default Logo;
