import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Alert, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerAsync } from "../../Services/Actions/userAction";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.userReducer.error);
  const isCreated = useSelector((state) => state.userReducer.isCreated);

  const initialState = {
    email: "",
    password: "",
    cpass: "",
  };

  const [inputForm, setInputForm] = useState(initialState);
  const [validationError, setValidationError] = useState("");

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputForm.password.length < 6) {
      setValidationError("Password must be at least 6 characters long.");
      return;
    }
    if (inputForm.password !== inputForm.cpass) {
      setValidationError("Passwords do not match.");
      return;
    }

    setValidationError("");
    dispatch(registerAsync(inputForm));
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/signIn");
    }
  }, [isCreated, navigate]);

  return (
    <div 
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #c5ca5dff 50%, #70ac4dff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}>
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <Card className="p-4 shadow-lg rounded-4 border-0">
            <Card.Body>
              <h2 className="text-center mb-4" style={{ fontWeight: "bold", color: "#000000ff" }}>
                Create Your Account
              </h2>

              {error && <Alert variant="danger">{error}</Alert>}
              {validationError && <Alert variant="warning">{validationError}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={inputForm.email}
                    onChange={handleChanged}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password (min 6 characters)"
                    name="password"
                    value={inputForm.password}
                    onChange={handleChanged}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formConfirmPassword">
                  <Form.Label className="fw-semibold">Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re-enter password"
                    name="cpass"
                    value={inputForm.cpass}
                    onChange={handleChanged}
                    required
                  />
                </Form.Group>

                <Button
                  variant="info"
                  type="submit"
                  className="w-100 py-2 fw-bold"
                  style={{ fontSize: "1.1rem", borderRadius: "8px" }}
                >
                  Sign Up
                </Button>
              </Form>

              <div className="text-center mt-3">
                <span>Already have an account? </span>
                <Link to="/signIn" className="fw-semibold" style={{ color: "#007bff" }}>
                  Sign In
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default SignUp;
