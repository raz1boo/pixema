import { ReactNode } from "react";
import "./Layout.scss";

interface ILayout {
  children: ReactNode;
}

function Layout({children}:ILayout) {
  return (
    <div className="layout">
      {children}
    </div>
  );
}

export default Layout;
