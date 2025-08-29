import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync, updateProductAsync } from "../Services/Actions/productAction";
import { Form, Button, Card, Container, Row, Col, Spinner } from "react-bootstrap";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productReducer, isLoading } = useSelector((state) => state.productReducer || {});

  const initialState = {
    id: "",
    title: "",
    desc: "", 
    price: "",
    category: "",
    image: "",
    unit: "",
  };

  const [inputForm, setInputForm] = useState(initialState);

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setInputForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProductAsync(inputForm));
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      dispatch(getProductAsync(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (productReducer && Object.keys(productReducer).length > 0) {
      setInputForm({
        id: product.id || "",
        title: product.title || "",
        desc: product.desc || "",
        price: product.price || "",
        category: product.category || "",
        image: product.image || "",
        unit: product.unit || "",
      });
    }
  }, [productReducer]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" variant="success" />
        <span className="ms-2 fw-bold text-success">Loading product...</span>
      </div>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card
            className="shadow-lg border-0 rounded-4"
            style={{
              background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
            }}
          >
            <Card.Body className="p-5">
              <h2 className="text-center mb-4 fw-bold text-dark">
                ✏️ Edit Product
              </h2>
              <p className="text-center text-muted mb-4">
                Update your product details below and click save
              </p>

              <Form onSubmit={handleSubmit}>
                {/* Product Name */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter product title"
                    value={inputForm.title}
                    onChange={handleChanged}
                    className="rounded-pill shadow-sm"
                  />
                </Form.Group>

                {/* Description */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="desc"
                    placeholder="Enter description"
                    value={inputForm.desc}
                    onChange={handleChanged}
                    className="rounded-3 shadow-sm"
                  />
                </Form.Group>

                {/* Unit & Price */}
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Unit</Form.Label>
                      <Form.Control
                        type="text"
                        name="unit"
                        placeholder="e.g., kg, litre, pcs"
                        value={inputForm.unit}
                        onChange={handleChanged}
                        className="rounded-pill shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        placeholder="Enter price"
                        value={inputForm.price}
                        onChange={handleChanged}
                        className="rounded-pill shadow-sm"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Category */}
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={inputForm.category}
                    onChange={handleChanged}
                    className="rounded-pill shadow-sm"
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
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Product Image</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    placeholder="Paste image URL"
                    value={inputForm.image}
                    onChange={handleChanged}
                    className="rounded-pill shadow-sm"
                  />
                  {inputForm.image && (
                    <div className="text-center mt-3">
                      <img
                        src={inputForm.image}
                        alt="Preview"
                        className="img-thumbnail shadow"
                        style={{
                          width: "140px",
                          height: "140px",
                          borderRadius: "15px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  )}
                </Form.Group>

                {/* Submit */}
                <div className="d-grid mt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-pill shadow fw-bold"
                    style={{
                      background:
                        "linear-gradient(135deg, #ff6a00 0%, #ee0979 100%)",
                      border: "none",
                    }}
                  >
                    🚀 Update Product
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProduct;
