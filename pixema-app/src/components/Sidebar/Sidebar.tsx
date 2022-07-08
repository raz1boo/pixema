import "./Sidebar.scss";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Logo from "./Logo/Logo";

function Sidebar() {
  return (
    <aside>
      <div>
        <Logo />
        <Navbar />
      </div>
      <Footer />
    </aside>
  );
}

export default Sidebar;
