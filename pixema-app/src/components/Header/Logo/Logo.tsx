import { Link } from "react-router-dom";
import "./Logo.scss";

const Logo = () => {
    return (
        <Link to='/'><img src="/pixema.png" className="logo" alt="logo" /></Link>
    )
}


export default Logo;