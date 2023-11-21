import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <>
      <header>
        <h1>:D</h1>
      </header>
      <Outlet />
    </>
  );
}

export default HomeLayout;
