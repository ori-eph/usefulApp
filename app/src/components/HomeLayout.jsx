import { Outlet, Link, useNavigate } from "react-router-dom";
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
        <Link to="posts">Posts</Link>
      </nav>
      {/* <LayoutProvider> */}
      <Outlet context={[currentUser, setCurrentUser]} />
      {/* </LayoutProvider> */}
    </>
  );
}
