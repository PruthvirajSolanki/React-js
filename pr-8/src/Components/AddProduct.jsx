import generateUniqueId from "generate-unique-id";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Container, Form, Card , Row , Col } from "react-bootstrap";
import { getStorageData, setStorageData } from "../Services/Service";

const AddProduct = () => {
  const navigate = useNavigate();
  const initialState = {
    productName: "",
    desc: "",
    price: "",
    category: "",
    image: "",
    warranty: "",
    pincode: "",
  };
  const [inputForm, setInputForm] = useState(initialState);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = generateUniqueId({ length: 6, useLetters: false });
    const newProduct = { ...inputForm, id };
    let data = getStorageData();
    data.push(newProduct);
    setStorageData(data);
    navigate("/");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card style={{ minWidth: 400, maxWidth: 500, width: "100%", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", borderRadius: "1rem" }}>
        <Card.Body>
          <h2 className="mb-4 text-center" style={{ color: "#2874f0", fontWeight: 700 }}>Add Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control name="productName" value={inputForm.productName} onChange={handleChanged} className="rounded-pill shadow-sm" placeholder="Enter Product Name" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control name="desc" value={inputForm.desc} onChange={handleChanged} className="rounded-pill shadow-sm" placeholder="Enter Description" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" type="number" value={inputForm.price} onChange={handleChanged} className="rounded-pill shadow-sm" placeholder="Enter Price" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" value={inputForm.category} onChange={handleChanged} className="rounded-pill shadow-sm" required>
                <option value="" disabled hidden>Select Category</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="home">home</option>
                <option value="tv&Appliances">tv&Appliances</option>
                <option value="flight">flight</option>
                <option value="beauty">beauty</option>
                <option value="grocery">grocery</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Warranty</Form.Label>
              <Form.Control name="warranty" value={inputForm.warranty} onChange={handleChanged} className="rounded-pill shadow-sm" placeholder="1 Year Upto Purchase Of Rs 500." required />
            </Form.Group>

            <Row className="mb-3">
              <Col>
            <Form.Label>Delivery Pincode </Form.Label>
            <Form.Control
              className="rounded-pill shadow-sm" type="text" placeholder="Enter delivery pincode" name="pincode" 
              value={inputForm.pincode} onChange={handleChanged} required/>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="image" value={inputForm.image} onChange={handleChanged} className="rounded-pill shadow-sm" placeholder="Enter Image URL" required />
            </Form.Group>
            <Button type="submit" className="w-100 rounded-pill" style={{ background: "#2874f0", border: "none", fontWeight: "bold" }}> Add Product</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddProduct;
