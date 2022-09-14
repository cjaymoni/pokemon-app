import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

function AppLayout() {
  return (
    <Fragment>
      <div>
        <Header />
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </Fragment>
  );
}

export default AppLayout;
