import React, { useState } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    fetch(`http://localhost:3000/users`)
      .then((res) => res.json())
      .then((data) => console.log(data));
    // {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ username: username }),
    // });
    // console.log(user.json());
    // } catch (err) {
    //   console.log(err);
    // }
  }

  return (
    <main>
      <h1>Login!</h1>
      <form>
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          id="username"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </main>
  );
}

export default Login;
