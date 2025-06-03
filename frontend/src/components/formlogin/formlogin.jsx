import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Register from "../formregister/formregister";
import axios from "axios";

function Login({ show, handleClose, setUser, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response && response.data) {
        const { user } = response.data;
        setUser(user);
        setIsLoggedIn(true);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", true);
        handleClose();
        if (user.level === 1) {
          navigate("/admin-home");
        }
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.error || error.message
      );
      setLoginError(error.response?.data?.error || "Gagal login, coba lagi");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} keyboard={false} centered>
      <Modal.Header closeButton className="border-bottom-0"></Modal.Header>
      <Modal.Body>
        <Modal.Title className="p-3 text-center fw-bold">Rehatin</Modal.Title>
        <Form className="py-2 px-5" onSubmit={handleLogin}>
          {loginError && (
            <div className="text-danger mb-3 text-center">{loginError}</div>
          )}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="fw-bold">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Input password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            className="w-100 mt-4 shadow"
            style={{ backgroundColor: "#468392" }}
          >
            Login
          </Button>
        </Form>
        <Register />
      </Modal.Body>
    </Modal>
  );
}

export default Login;
