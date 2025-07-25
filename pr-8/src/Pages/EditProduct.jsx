import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form, Card } from "react-bootstrap";
import { getStorageData, setStorageData } from "../Services/Service";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialState = {
    id: "",
    productName: "",
    desc: "",
    price: "",
    category: "",
    warranty: "",
    pincode: "",
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
    let data = getStorageData();
    let updateData = data.map((prod) =>
      prod.id == id ? inputForm : prod
    );
    setStorageData(updateData);
    navigate("/");
  };

  useEffect(() => {
    let data = getStorageData();
    let singleRec = data.find((product) => product.id == id);
    setInputForm(singleRec || initialState);
  }, [id]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card style={{ minWidth: 400, maxWidth: 500, width: "100%", borderRadius: "1rem", boxShadow: "0 4px 16px rgba(0,0,0,0.05)" }}>
        <Card.Body>
          <h2 className="mb-4 text-center" style={{ color: "#673ab7", fontWeight: 700 }}>Edit Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="productName"
                value={inputForm.productName}
                onChange={handleChanged}
                className="rounded-pill shadow-sm"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="desc"
                value={inputForm.desc}
                onChange={handleChanged}
                className="rounded-pill shadow-sm"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={inputForm.price}
                onChange={handleChanged}
                className="rounded-pill shadow-sm"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={inputForm.category}
                onChange={handleChanged}
                className="rounded-pill shadow-sm"
                required
              >
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
              <Form.Control
                type="text"
                placeholder="e.g. 1 year, 6 months"
                name="warranty"
                value={inputForm.warranty}
                onChange={handleChanged}
                className="rounded-pill shadow-sm"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
            <Form.Label>Pincode</Form.Label>
            <Form.Control type="text" name="pincode" placeholder="Enter delivery pincode" value={inputForm.pincode}
              onChange={handleChanged} className="rounded-pill shadow-sm" required/>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={inputForm.image}
                onChange={handleChanged}
                className="rounded-pill shadow-sm"
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className="w-100 rounded-pill"
              style={{ background: "#673ab7", border: "none", fontWeight: "bold", fontSize: "1.1rem" }}>
               Update Product
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProduct;