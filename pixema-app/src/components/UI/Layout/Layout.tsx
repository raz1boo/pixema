import { ReactNode } from "react";
import "./Layout.scss";
import cn from "classnames";

interface ILayout {
  children: ReactNode;
  className?: string | undefined;
}

function Layout({ children, className }: ILayout) {
  return <div className={cn("layout", className)}>{children}</div>;
}

export default Layout;
