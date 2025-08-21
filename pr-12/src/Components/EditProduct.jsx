import { Button, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductAsync, updateProductAsync } from "../Services/Actions/productAction";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get product and loading state from reducer
  const { product, isLoading } = useSelector((state) => state.product || {});

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

  // Fetch single product on mount
  useEffect(() => {
    if (id) {
      dispatch(getProductAsync(id));
    }
  }, [id, dispatch]);

  // When product data is loaded, set the form values
  useEffect(() => {
    if (product && Object.keys(product).length > 0) {
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
  }, [product]);

  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <h4>Loading product...</h4>
      </Container>
    );
  }

  return (
    <Container className="py-5" style={{ maxWidth: "720px" }}>
      <h2 className="fw-bold mb-4 text-success text-center">Edit Product</h2>
      <Form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow-sm border"
      >
        {/* Title */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product title"
            name="title"
            value={inputForm.title}
            onChange={handleChanged}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            name="desc"
            rows={3}
            value={inputForm.desc}
            onChange={handleChanged}
          />
        </Form.Group>

        {/* Unit */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Unit</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g., kg, litre, pcs"
            name="unit"
            value={inputForm.unit}
            onChange={handleChanged}
          />
        </Form.Group>

        {/* Price */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            value={inputForm.price}
            onChange={handleChanged}
          />
        </Form.Group>

        {/* Category */}
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Category</Form.Label>
          <Form.Select
            name="category"
            value={inputForm.category}
            onChange={handleChanged}
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            <option value="paan">Paan</option>
            <option value="dairy">Dairy</option>
            <option value="fruits">Fruits</option>
            <option value="drinks">Drinks</option>
            <option value="snacks">Snacks</option>
            <option value="breakfast">Breakfast</option>
            <option value="sweet">Sweet</option>
            <option value="bakery">Bakery</option>
            <option value="tea">Tea</option>
            <option value="atta">Atta</option>
            <option value="masala">Masala</option>
            <option value="sauces">Sauces</option>
            <option value="meat">Meat</option>
            <option value="organic">Organic</option>
            <option value="baby">Baby</option>
            <option value="pharma">Pharma</option>
            <option value="cleaning">Cleaning</option>
            <option value="home">Home</option>
            <option value="personal">Personal</option>
            <option value="pet">Pet</option>
          </Form.Select>
        </Form.Group>

        {/* Image URL */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Image URL</Form.Label>
          <Form.Control
            type="file"
            placeholder="Enter image URL"
            name="image"
            value={inputForm.image}
            onChange={handleChanged}
          />
        </Form.Group>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-100 fw-semibold"
          style={{
            backgroundColor: "#03831f",
            border: "none",
            height: "48px",
            fontSize: "16px",
            borderRadius: "8px",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#66da7fff";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#03831f";
          }}
        >
          Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default EditProduct;
