import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Alert, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { signInAsync, signInWithGoogleAsync } from "../../Services/Actions/userAction";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.userReducer);

  const initialState = { email: "", password: "" };
  const [inputForm, setInputForm] = useState(initialState);
  const [validationError, setValidationError] = useState("");

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputForm.password.length < 6) {
      setValidationError("Password must be at least 6 characters long.");
      return;
    }
    setValidationError("");
    dispatch(signInAsync(inputForm));
  };

  const handleGoogleLogin = () => {
    dispatch(signInWithGoogleAsync());
  };

  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  return (
    <div 
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #c5ca5dff 50%, #70ac4dff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg p-4 rounded-4" style={{ background: "#faf8f8ff" }}>
              <h3 className="text-center mb-3 fw-bold text-success">Welcome Back!</h3>
              <p className="text-center text-muted mb-4">
                Sign in to continue to <strong>Blinkit Cart</strong>
              </p>

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

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 fw-semibold shadow-sm"
                  style={{ borderRadius: "12px" }}
                >
                  Sign In
                </Button>
              </Form>

              <div className="text-center my-3 text-muted">OR</div>

              <Button
                variant="danger"
                onClick={handleGoogleLogin}
                className="w-100 py-2 fw-semibold shadow-sm"
                style={{ borderRadius: "12px" }}
              >
                <i className="bi bi-google me-2"></i> Sign In with Google
              </Button>

              <div className="text-center mt-3">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/signup" className="fw-bold text-decoration-none">
                  Sign Up
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
