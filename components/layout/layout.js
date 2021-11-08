import { Fragment } from "react";
import Copyright from "../copyright/Copyright";
import MainHeader from "./main-header";

function Layout(props) {
  return (
    <Fragment>
      <header>
        <MainHeader />
      </header>
      <main>{props.children}</main>
      <footer>
        <Copyright />
      </footer>
    </Fragment>
  );
}

export default Layout;
