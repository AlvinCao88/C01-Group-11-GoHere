import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function LoginPage({ mode }) {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "signup") {
      processSignUp(email, password);
      return;
    }
    processLogin(email, password);
  };

  const processLogin = async (email, password) => {
    try {
      const response = await fetch("/api/v1/admin/loginUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseBody = await response.json();

      if (response.ok) {
        localStorage.setItem("token", responseBody.token);
        window.location.href = "/validate/washrooms";
      }
      console.log(responseBody);

      setErrorMessage(responseBody.error);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const processSignUp = async (email, password) => {
    try {
      const response = await fetch("/api/v1/admin/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const responseBody = await response.json();

      if (response.ok) {
        localStorage.setItem("token", responseBody.token);
        window.location.href = "/validate/washrooms";
        return;
      }

      setErrorMessage(responseBody.error);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ maxWidth: "100vw", width: "100vw", height: "100vh" }}
    >
      <div style={{ width: "800px", marginTop: "8rem" }}>
        <h1>
          GoHere Administrator Site: {mode === "signup" ? "Sign Up" : "Log In"}
        </h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            onClick={(e) => {
              handleSubmit(e);
            }}
            variant="primary"
            type="submit"
          >
            {mode === "signup" ? "Sign Up" : "Log In"}
          </Button>
          <div className="m-3">
            {mode === "signup"
              ? `Already Have An Account?  `
              : `Dont Have An Account?  `}
            <a
              href={mode === "signup" ? `./login` : `./signup`}
              style={{ marginLeft: "10px" }}
            >
              <u>{mode === "signup" ? `LOG IN` : `SIGN UP`}</u>
            </a>
          </div>
          <div className="m-3 text-danger">{errorMessage}</div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
