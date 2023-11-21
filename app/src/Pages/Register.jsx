import { useState } from "react";

function Register() {
  // const [page, setPage] = useState(1);
  // const [formStatus, setFormStatus] = useState("typing");
  // const [err, setErr] = useState(null);
  // const [formValues, setFormValues] = useState({
  //   username: "",
  //   password: "",
  //   fullName: "",
  //   email: "",
  //   address: {
  //     city: "",
  //   },
  // });

  // async function validateStartInfo() {
  //   setErr(null);
  //   setFormStatus("loading");
  //   try {
  //     if (!formValues.username || !formValues.password) {
  //       throw Error("u must fill all the fields.");
  //     }
  //     const checkExistReq = await fetch(
  //       `http://localhost:3000/users/?username=${formValues.username}`
  //     );
  //     if (!checkExistReq.ok) {
  //       throw Error("A loading error has accrued, please try again later.");
  //     }
  //     const foundUsers = await checkExistReq.json();
  //     if (foundUsers.length) {
  //       throw Error("username taken.");
  //     } else {
  //       setPage(2);
  //       setFormStatus("typing");
  //     }
  //   } catch (err) {
  //     setFormStatus("error");
  //     setErr(err);
  //   }
  // }

  // function validateAdditionInfo() {
  //   for (const key in formValues) {
  //     if (!formValues[key]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  // async function signUpUser(e) {
  //   setFormStatus("loading");
  //   setErr(null);
  //   e.preventDefault();
  //   try {
  //     if (!validateAdditionInfo()) {
  //       throw Error("u must fill all the fields.");
  //     }
  //     const checkExistReq = await fetch(`http://localhost:3000/users`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formValues),
  //     });
  //     if (!checkExistReq.ok) {
  //       throw Error(
  //         "A loading error has accrued, please wait for a bit and then try again."
  //       );
  //     }
  //     const foundUsers = await checkExistReq.json();
  //     if (foundUsers.length) {
  //       throw Error("username taken.");
  //     } else {
  //       setFormStatus("sent");
  //     }
  //   } catch (err) {
  //     setFormStatus("error");
  //     setErr(err);
  //   }
  // }

  // function handleInputChange(e) {
  //   const { name, value } = e.target;
  //   setFormValues((prevFormValues) => ({
  //     ...prevFormValues,
  //     [name]: value,
  //   }));
  // }

  const [page, setPage] = useState(1);
  const [formStatus, setFormStatus] = useState("typing");
  const [err, setErr] = useState(null);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    address: {
      city: "",
    },
  });

  // Helper function to update form values
  const updateFormValues = (name, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

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
      validateFields(["username", "password"]);
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
      const foundUsers = await handleServerRequest(
        `http://localhost:3000/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        }
      );
      if (foundUsers.length) {
        throw Error("username taken.");
      }
      setFormStatus("sent");
    } catch (err) {
      setFormStatus("error");
      setErr(err);
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormValues(name, value);
  };

  return (
    <form>
      {page === 1 && (
        <>
          <input
            type="text"
            placeholder="Username..."
            name="username"
            value={formValues.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            placeholder="Password..."
            name="password"
            value={formValues.password}
            onChange={handleInputChange}
          />
          <button type="button" onClick={validateStartInfo}>
            next
          </button>
        </>
      )}
      {page === 2 && (
        <>
          <input
            type="text"
            placeholder="Ex: donald duck..."
            name="fullName"
            value={formValues.fullName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            placeholder="Email..."
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
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
        <p>{formStatus === "sent" ? "sent" : err?.message || "loading..."}</p>
      )}
    </form>
  );
}

export default Register;
