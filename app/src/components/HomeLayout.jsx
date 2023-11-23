import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
import "../css/HomeLayout.css";
// import { LayoutProvider } from "../context/LayoutProvider";

export default function HomeLayout() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  function handleLogout() {
    setCurrentUser("");
    localStorage.removeItem("currentUser");
    navigate("/login");
  }

  return (
    <>
      <header>
        <Link id="homeLogo" to="/home">
          📋usefulApp
        </Link>
        <Link id="info" to="info">
          your Info
        </Link>
        <button onClick={handleLogout} id="logout">
          logout
        </button>
      </header>
      {/* <div id="container"> */}
      <nav>
        <NavLink
          end
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="/home"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="posts"
        >
          Posts
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="todos"
        >
          Todos
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          to="albums"
        >
          Albums
        </NavLink>
      </nav>
      {/* <LayoutProvider> */}
      <div id="homeBody">
        {/* <div id="contentContainer"> */}
        <Outlet context={[currentUser, setCurrentUser]} />
        {/* </div> */}
      </div>
      {/* </LayoutProvider> */}
      {/* </div> */}
    </>
  );
}
