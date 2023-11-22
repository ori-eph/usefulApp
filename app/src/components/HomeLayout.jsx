import { Outlet, Link, useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";
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
        <Link to="info"> Info </Link>
        <button onClick={handleLogout} id="logout">
          logout
        </button>
      </header>
      <nav>
        <NavLink to="posts">Posts</NavLink>
        <NavLink to="todos">Todos</NavLink>
        <NavLink to="albums">Albums</NavLink>
      </nav>
      {/* <LayoutProvider> */}
      <Outlet context={[currentUser, setCurrentUser]} />
      {/* </LayoutProvider> */}
    </>
  );
}
