import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

function AppLayout() {
  return (
    <Fragment>
      <div className="min-h-screen">
        {/* <div>
          <Header />
        </div> */}
        <section className="w-full min-h-screen">
          <Outlet></Outlet>
        </section>
      </div>
    </Fragment>
  );
}

export default AppLayout;
