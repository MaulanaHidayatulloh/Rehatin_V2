import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

function Register() {
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/auth/register", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });

      // Handle successful registration
      console.log("Registration successful:", response.data);
      handleClose();
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
      handleClose();
      // Optionally display an error message to the user
    }
  };

  return (
    <>
      <div className="m-3 text-center" variant="">
        Don't have an account yet?{" "}
        <span
          style={{ color: "#468392", cursor: "pointer" }}
          onClick={handleShow}
        >
          sign up
        </span>{" "}
        now
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="border-bottom-0"></Modal.Header>
        <Modal.Body>
          <Modal.Title className="p-2 text-center fw-bold ">
            Rehatin
          </Modal.Title>
          <Form className="p-5" onSubmit={handleRegister}>
            <Form.Group className="mb-3" controlId="inputfirstname">
              <Form.Label className="fw-bold">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="inputlastname">
              <Form.Label className="fw-bold">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="">
              <Form.Label className="fw-bold">Email address</Form.Label>
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
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Register;
