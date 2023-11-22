import { useOutletContext } from "react-router-dom";
// import { currentUserContext } from "../components/HomeLayout";

function Home() {
  const [currentUser, setCurrentUser] = useOutletContext();
  // console.log(currentUser);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome, {currentUser.name} </h1>
    </>
  );
}

export default Home;
