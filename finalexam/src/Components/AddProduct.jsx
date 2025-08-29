import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import generateUniqueId from "generate-unique-id";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync } from "../Services/Actions/productAction";

import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { FaPlusCircle } from "react-icons/fa";

const AddProduct = () => {
  const { isCreated } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    id: "",
    title: "",
    desc: "",
    unit: "",
    price: "",
    category: "",
    image: "",
  };

  const [inputForm, setInputForm] = useState(initialState);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = generateUniqueId({ length: 6, useLetters: false });
    const formData = { ...inputForm, id };
    dispatch(addProductAsync(formData));
    navigate("/");
  };

  useEffect(() => {
    if (isCreated) {
      navigate("/");
    }
  }, [isCreated, navigate]);

  useEffect(() => {
    if (!user) {
      navigate("/signIn");
    }
  }, [user, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card
        className="shadow-lg border-0 rounded-4"
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
        }}
      >
        {/* Header */}
        <div
          className="text-center text-white p-4 rounded-top"
          style={{
            background: "linear-gradient(135deg, #56ab2f, #a8e063)",
          }}
        >
          <FaPlusCircle size={40} className="mb-2" />
          <h2 className="fw-bold m-0">Add New Product</h2>
          <small>Fill details to add into inventory</small>
        </div>

        {/* Body */}
        <Card.Body className="p-4">
          <Form onSubmit={handleSubmit}>
            {/* Product Name */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Product Name</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={inputForm.title}
                onChange={handleChanged}
                placeholder="e.g., Fresh Potato"
                className="rounded-3 shadow-sm"
                required
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="desc"
                value={inputForm.desc}
                onChange={handleChanged}
                placeholder="e.g., Organic and Fresh"
                className="rounded-3 shadow-sm"
                required
              />
            </Form.Group>

            <Row>
              {/* Price */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={inputForm.price}
                    onChange={handleChanged}
                    placeholder="e.g., 45"
                    className="rounded-3 shadow-sm"
                    required
                  />
                </Form.Group>
              </Col>

              {/* Unit */}
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Unit</Form.Label>
                  <Form.Control
                    type="text"
                    name="unit"
                    value={inputForm.unit}
                    onChange={handleChanged}
                    placeholder="e.g., 1 kg, 500 g"
                    className="rounded-3 shadow-sm"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Category */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Category</Form.Label>
              <Form.Select
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
                className="rounded-3 shadow-sm"
                required
              >
                <option value="" disabled hidden>
                  Select Category
                </option>
                <option value="paan">Paan</option>
                <option value="fruits">Fruits</option>
                <option value="atta">Atta</option>
                <option value="masala">Masala</option>
                <option value="zepto">Zepto</option>
                <option value="sweets">Sweets</option>
                <option value="toys">Toys</option>
                <option value="life">Life</option>
                <option value="jewellery">Jewellery</option>
                <option value="food">Food</option>
                <option value="icecream">Ice-Cream</option>
              </Form.Select>
            </Form.Group>

            {/* Image */}
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Product Image</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
                placeholder="https://url..."
                className="rounded-3 shadow-sm"
              />
            </Form.Group>

            {/* Submit */}
            <div className="d-grid">
              <Button
                type="submit"
                size="lg"
                className="rounded-pill fw-bold shadow"
                style={{
                  background: "linear-gradient(135deg, #f7971e, #ffd200)",
                  border: "none",
                  color: "#000",
                }}
              >
                🚀 Add Product
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProduct;
