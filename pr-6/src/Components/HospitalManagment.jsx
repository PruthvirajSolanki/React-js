import { useState } from "react";
import { Container, Form, Row, Col, Button, Card, Badge } from "react-bootstrap";
import '../Components/HospitalManagment.css';

const HospitalManagment = () => {
  const initialForm = {
    registrationId: "",
    healthCareNumber: "",
    location: "",
    registrationDate: "",
    registrationTime: "",
    firstName: "",
    lastName: "",
    street1: "", 
    city: "",
    region: "",
    postalCode: "",
    country: "",
  };

  const [form, setForm] = useState(initialForm);
  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [errors, setErrors] = useState({});



  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.registrationId.trim()) newErrors.registrationId = "Please enter a registration ID.";
    if (!form.healthCareNumber.trim()) newErrors.healthCareNumber = "Health care number is required.";
    if (!form.location.trim()) newErrors.location = "Please provide the registration location.";
    if (!form.registrationDate) newErrors.registrationDate = "Select a registration date.";
    if (!form.registrationTime) newErrors.registrationTime = "Select a registration time.";
    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.street1.trim()) newErrors.street1 = "Street address is required.";
    if (!form.city.trim()) newErrors.city = "City is required.";
    if (!form.region.trim()) newErrors.region = "State is required.";
    if (!form.postalCode.trim()) newErrors.postalCode = "Postal code is required.";
    if (!form.country.trim()) newErrors.country = "Please select a country.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (editIndex !== null) {
      const updatedData = [...submittedData];
      updatedData[editIndex] = form;
      setSubmittedData(updatedData);
      setEditIndex(null);
    } else {
      setSubmittedData([...submittedData, form]);
    }

    setForm(initialForm);
    setErrors({});
  };

  const handleEdit = (index) => {
    setForm(submittedData[index]);
    setEditIndex(index);
    setErrors({});
  };

  const handleDelete = (index) => {
    const filtered = submittedData.filter((_, i) => i !== index);
    setSubmittedData(filtered);
    if (editIndex === index) {
      setEditIndex(null);
      setForm(initialForm);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setForm(initialForm);
    setErrors({});
  };

  return (
    <Container className="container-custom">
      <Card className="form-card">
        <h1 className="heading-title mb-4">Hospital Management Form</h1>

        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Registration Check ID</Form.Label>
              <Form.Control
                name="registrationId"
                value={form.registrationId}
                onChange={handleChange}
                placeholder="Enter ID"
                isInvalid={!!errors.registrationId}
              />
              <Form.Control.Feedback type="invalid">
                {errors.registrationId}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>
                Health Care Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                name="healthCareNumber"
                value={form.healthCareNumber}
                onChange={handleChange}
                placeholder="Enter Health Care No."
                isInvalid={!!errors.healthCareNumber}
              />
              <Form.Control.Feedback type="invalid">
                {errors.healthCareNumber}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Registration Location (e.g. ER, Clinic)</Form.Label>
            <Form.Control
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter location"
              isInvalid={!!errors.location}
            />
            <Form.Control.Feedback type="invalid">
              {errors.location}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Registration Date</Form.Label>
              <Form.Control
                type="date"
                name="registrationDate"
                value={form.registrationDate}
                onChange={handleChange}
                isInvalid={!!errors.registrationDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.registrationDate}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Label>Registration Time</Form.Label>
              <Form.Control
                type="time"
                name="registrationTime"
                value={form.registrationTime}
                onChange={handleChange}
                isInvalid={!!errors.registrationTime}
              />
              <Form.Control.Feedback type="invalid">
                {errors.registrationTime}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Form.Label>Patient Name</Form.Label>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                name="firstName"
                placeholder="First"
                value={form.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Control
                name="lastName"
                placeholder="Last"
                value={form.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Form.Label>Address</Form.Label>
          <Form.Group className="mb-2">
            <Form.Control
              name="street1"
              placeholder="Street Address"
              value={form.street1}
              onChange={handleChange}
              isInvalid={!!errors.street1}
            />
            <Form.Control.Feedback type="invalid">
              {errors.street1}
            </Form.Control.Feedback>
          </Form.Group>

          <Row className="mb-2">
            <Col md={6}>
              <Form.Control
                name="region"
                placeholder="State"
                value={form.region}
                onChange={handleChange}
                isInvalid={!!errors.region}
              />
              <Form.Control.Feedback type="invalid">
                {errors.region}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Control
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                isInvalid={!!errors.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.city}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Control
                name="postalCode"
                placeholder="Postal / Zip Code"
                value={form.postalCode}
                onChange={handleChange}
                isInvalid={!!errors.postalCode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.postalCode}
              </Form.Control.Feedback>
            </Col>
            <Col md={6}>
              <Form.Select
                name="country"
                value={form.country}
                onChange={handleChange}
                isInvalid={!!errors.country}
              >
                <option value="" disabled hidden>Country</option>
                <option>India</option>
                <option>United States</option>
                <option>Canada</option>
                <option>UK</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.country}
              </Form.Control.Feedback>
            </Col>
          </Row>

          <div className="text-end">
            <Button type="submit" variant={editIndex !== null ? "info" : "dark"} className="me-2">
              {editIndex !== null ? "Update" : "Submit"} Registration
            </Button>
            {editIndex !== null && (
              <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
            )}
          </div>
        </Form>
      </Card>

      <div className="mt-5">
        <h4 className="mb-3">Registered Patients</h4>
        {submittedData.map((data, index) => (
          <Card key={index} className="patient-card">
            <Card.Body>
              <Card.Title className="patient-name">
                <strong>{data.firstName} {data.lastName}</strong>
              </Card.Title>

              <Card.Text>
                <strong>Registration ID:</strong> {data.registrationId}<br />
                <strong>Health Care Number:</strong> {data.healthCareNumber}<br />
                <strong>Location:</strong> {data.location}<br />
                <strong>Date & Time:</strong> {data.registrationDate} at {data.registrationTime}
              </Card.Text>

              <hr />

              <Card.Text>
                <strong>Address:</strong><br />
                {data.street1}<br />
                {data.city}, {data.region}, {data.postalCode}<br />
                <strong>Country:</strong> {data.country}
              </Card.Text>

              <Badge bg="success" className="badge-registered mb-3">Registered</Badge><br />
              <Button variant="secondary" size="sm" className="me-2" onClick={() => handleEdit(index)}>Edit</Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default HospitalManagment;
