import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import HomeLayout from "./components/HomeLayout";
import Login from "./Pages/Login";
import Info from "./Pages/Info";
import Posts from "./Pages/Posts";
import Register from "./Pages/Register";
import ToDoList from "./Pages/Todo/ToDoList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="home" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="todos" element={<ToDoList />} />
          {/* <Route path="posts" element={<Posts />}>
            <Route path=":id" element={<singlePost />} />
          </Route>
          {/* <Route path="albums" element={<Albums />}>
            <Route path=":id" element={<singleAlbum />} />
          </Route> */}
          <Route path="info" element={<Info />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
