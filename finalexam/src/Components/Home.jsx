import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAsync,
  getAllProductAsync,
} from "../Services/Actions/productAction";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Modal,
  Form,
  Pagination,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = ({ searchTerm = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, isLoading } = useSelector(
    (state) => state.productReducer || {}
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteProductAsync(id));
  };

  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === "price" || sortField === "unit") {
      valA = parseFloat(valA) || 0;
      valB = parseFloat(valB) || 0;
    } else {
      valA = valA?.toString().toLowerCase() || "";
      valB = valB?.toString().toLowerCase() || "";
    }

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Container className="my-4">
      <h2 className="text-center fw-bold mb-4" 
        style={{ 
          color: "#6f42c1", 
          textShadow: "2px 2px 5px rgba(0,0,0,0.2)" 
        }}
      >
        🛒 Zepto Cart
      </h2>

      {/* Filters */}
      <Row className="mb-4 justify-content-center">
        <Col xs={12} md="auto" className="mb-2">
          <Form.Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="shadow-sm border-primary"
          >
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={12} md="auto" className="mb-2">
          <Form.Select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="shadow-sm border-success"
          >
            <option value="title">Product Name</option>
            <option value="price">Price</option>
            <option value="unit">Unit</option>
          </Form.Select>
        </Col>
        <Col xs={12} md="auto" className="mb-2">
          <Form.Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="shadow-sm border-warning"
          >
            <option value="asc">🔝 Ascending</option>
            <option value="desc">⏬ Descending</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product Grid */}
      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p>Loading products...</p>
        </div>
      ) : (
        <Row>
          {paginatedProducts.map((prod) => (
            <Col key={prod.id} xs={12} sm={6} md={4} className="mb-4">
              <Card
                className="h-100 border-0 shadow-lg"
                style={{
                  borderRadius: "20px",
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <div
                  className="d-flex justify-content-center p-3"
                  style={{ background: "linear-gradient(135deg, #5eac3bff, #a9d770ff)" }}
                >
                  <Card.Img
                    variant="top"
                    src={prod.image}
                    alt={prod.title}
                    style={{
                      height: "180px",
                      width: "auto",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    className="text-center fw-bold"
                    style={{ color: "#0d6efd" }}
                  >
                    {prod.title}
                  </Card.Title>

                  <Card.Text className="text-muted small text-center">
                    {prod.desc?.length > 100
                      ? prod.desc.slice(0, 100) + "..."
                      : prod.desc}
                  </Card.Text>

                  <Card.Text className="fw-bold text-center" style={{ color: "#28a745" }}>
                    ₹{prod.price}{" "}
                    <small className="text-muted">
                      ({prod.unit || "1 kg"})
                    </small>
                  </Card.Text>

                  <div className="text-center mb-2">
                    <Badge pill bg="info" className="px-3 py-2 shadow-sm">
                      {prod.category}
                    </Badge>
                  </div>

                  <div className="mt-auto d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => setSelectedProduct(prod)}
                    >
                      👁 View
                    </Button>
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => handleEdit(prod.id)}
                    >
                      ✏️ Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(prod.id)}
                    >
                      🗑 Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={currentPage === i + 1}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
  <Modal
    show={!!selectedProduct}
    onHide={() => setSelectedProduct(null)}
    centered
    size="lg"
    contentClassName="border-0 shadow-lg rounded-4 overflow-hidden"
  >
    {/* Header with gradient */}
    <Modal.Header
      closeButton
      className="text-white"
      style={{
        background: "linear-gradient(135deg, #56ab2f, #a8e063)", // Fresh green gradient
      }}
    >
      <Modal.Title className="fw-bold fs-4">
        {selectedProduct.title}
      </Modal.Title>
    </Modal.Header>

    {/* Body */}
    <Modal.Body className="text-center bg-light">
      {/* Image inside shadowed box */}
      <div className="p-3 bg-white shadow rounded-3 mx-auto" style={{ maxWidth: "350px" }}>
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="img-fluid rounded-3"
          style={{
            maxHeight: "260px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Description */}
      <p className="mt-4 text-muted px-4">{selectedProduct.desc}</p>

      {/* Category badge */}
      <div className="mb-3">
        <Badge
          pill
          bg="dark"
          className="px-4 py-2 shadow-sm fs-6"
        >
          {selectedProduct.category}
        </Badge>
      </div>

      {/* Price */}
      <h3
        className="fw-bold mt-3"
        style={{
          background: "linear-gradient(135deg, #f7971e, #ffd200)", // Blinkit yellow
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        ₹ {selectedProduct.price}{" "}
        <small className="text-secondary">
          ({selectedProduct.unit || "1 kg"})
        </small>
      </h3>
    </Modal.Body>

    {/* Footer with stylish close button */}
    <Modal.Footer className="justify-content-center bg-white">
      <Button
        variant="danger"
        className="px-4 py-2 fw-bold shadow rounded-pill"
        onClick={() => setSelectedProduct(null)}
      >
        ✖ Close
      </Button>
    </Modal.Footer>
  </Modal>
)}

    </Container>
  );
};

export default Home;
