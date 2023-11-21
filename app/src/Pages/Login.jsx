import { useEffect, useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  function handleLogin() {}

  async function doSomthing() {
    const usersReq = await fetch("http://localhost:3000/users");
    const users = await usersReq.json();
    console.log(users);
  }

  useEffect(() => {
    doSomthing();
  }, []);

  return (
    <main>
      <form>
        <label htmlFor="username">username</label>
        <input id="username" type="text" />
        <label htmlFor="password">password</label>
        <input id="password" type="password" />
        <button onClick={handleLogin}>Login</button>
      </form>
    </main>
  );
}

export default Login;
