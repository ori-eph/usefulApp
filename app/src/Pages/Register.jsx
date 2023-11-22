import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [formStatus, setFormStatus] = useState("typing");
  const [err, setErr] = useState(null);
  const [formValues, setFormValues] = useState({
    username: "",
    website: "",
    verifyWeb: "",
    name: "",
    email: "",
    address: {
      city: "",
    },
  });

  // Helper function to validate form fields
  const validateFields = (fields) => {
    for (const field of fields) {
      if (!formValues[field]) {
        throw Error("u must fill all the fields.");
      }
    }
  };

  // Helper function to handle server requests
  const handleServerRequest = async (url, options) => {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw Error("A loading error has accrued, please try again later.");
    }
    const data = await response.json();
    return data;
  };

  // Function to validate start info
  const validateStartInfo = async () => {
    setErr(null);
    setFormStatus("loading");
    try {
      validateFields(["username", "website", "verifyWeb"]);

      if (formValues.website !== formValues.verifyWeb) {
        throw Error("the passwords don`t match.");
      }

      const foundUsers = await handleServerRequest(
        `http://localhost:3000/users/?username=${formValues.username}`
      );
      if (foundUsers.length) {
        throw Error("username taken.");
      }
      setPage(2);
      setFormStatus("typing");
    } catch (err) {
      setFormStatus("error");
      setErr(err);
    }
  };

  // Function to sign up user
  const signUpUser = async (e) => {
    e.preventDefault();
    setFormStatus("loading");
    setErr(null);
    try {
      validateFields(Object.keys(formValues));
      const newUser = formValues;
      delete newUser.verifyWeb;

      const addUser = await handleServerRequest(`http://localhost:3000/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      setFormStatus("sent");
      localStorage.setItem("currentUser", JSON.stringify(addUser));
      navigate("/home");
    } catch (err) {
      setFormStatus("error");
      setErr(err);
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  return (
    <form>
      {page === 1 && (
        <>
          <label htmlFor="username">username:</label>
          <input
            type="text"
            placeholder="Username..."
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
          />
          <label htmlFor="password">password:</label>
          <input
            type="password"
            placeholder="Password..."
            name="website"
            value={formValues.website}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="verify Password..."
            name="verifyWeb"
            value={formValues.verifyWeb}
            onChange={handleInputChange}
          />
          <button type="button" onClick={validateStartInfo}>
            next
          </button>
        </>
      )}
      {page === 2 && (
        <>
          <label htmlFor="name">full name:</label>
          <input
            type="text"
            placeholder="Ex: donald duck..."
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
          />
          <label htmlFor="email">email:</label>
          <input
            type="email"
            placeholder="Email..."
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
          <label htmlFor="city">city</label>
          <input
            type="text"
            placeholder="City..."
            name="city"
            value={formValues.address.city}
            onChange={(e) => {
              setFormValues((prevFormValues) => ({
                ...prevFormValues,
                address: {
                  ...prevFormValues.address,
                  city: e.target.value,
                },
              }));
            }}
          />
          <button
            type="button"
            onClick={() => {
              setFormStatus("typing");
              setPage(1);
            }}
          >
            back
          </button>
          <button
            type="submit"
            onClick={(e) => {
              signUpUser(e);
            }}
          >
            sign up
          </button>
        </>
      )}
      {formStatus !== "typing" && (
        <p>
          {formStatus === "sent"
            ? "login you in..."
            : err?.message || "loading..."}
        </p>
      )}
    </form>
  );
}

export default Register;
