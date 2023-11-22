import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleServerRequest } from "../utils";

function Login() {
  const [err, setErr] = useState(null);
  const [formStatus, setFormStatus] = useState("typing");
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  // Function to validate start info
  async function handleLogin(e) {
    e.preventDefault();
    setErr(null);
    setFormStatus("loading");
    try {
      const foundUser = await handleServerRequest(
        `http://localhost:3000/users/?username=${formValues.username}&website=${formValues.password}`
      );
      if (!foundUser.length) {
        throw Error("username or password not correct");
      } else {
        setFormStatus("sent");
        //log the user in
        localStorage.setItem("currentUser", JSON.stringify(foundUser[0]));
        navigate("/home");
      }
    } catch (err) {
      setFormStatus("error");
      setErr(err);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  return (
    <main>
      <form>
        <label htmlFor="username">username</label>
        <input
          id="username"
          type="text"
          name="username"
          onChange={handleInputChange}
        />
        <label htmlFor="password">password</label>
        <input
          name="password"
          id="password"
          type="password"
          onChange={handleInputChange}
        />
        <button
          onClick={(e) => {
            handleLogin(e);
          }}
        >
          Login
        </button>
      </form>
      {formStatus !== "typing" && (
        <p>{formStatus === "sent" ? "sent" : err?.message || "loading..."}</p>
      )}
    </main>
  );
}

export default Login;
