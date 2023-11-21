import React, { useState } from "react";

function Login() {
    const [username, setUsername] = useState('')
  return (

    function handleLogin() {

    }

    <main>
      <form>
        <label htmlFor="username">username</label>
        <input id="username" type="text" />
        <label htmlFor="password">password</label>
        <input id="username" type="password" />
        <button onClick={handleLogin} >Login</button>
      </form>
    </main>
  );
}

export default Login;
