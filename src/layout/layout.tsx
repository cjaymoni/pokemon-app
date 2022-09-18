import { Fragment } from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <Fragment>
      <div className="min-h-screen">
        <section className="w-full min-h-screen">
          <Outlet></Outlet>
        </section>
      </div>
    </Fragment>
  );
}

export default AppLayout;
