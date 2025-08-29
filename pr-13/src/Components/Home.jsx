import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductAsync,
  getAllProductAsync,
} from "../Services/Actions/productAction";
import {
  Badge,
  Button,
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Pagination,
  Form,
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

  const isLoggedIn = !!localStorage.getItem("token"); 
 

  useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);

  const handleEdit = (id) => {
    if (!isLoggedIn) {
      alert("You must sign in to edit a product.");
      navigate("/signIn");
      return;
    }
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    if (!isLoggedIn) {
      alert("You must sign in to delete a product.");
      navigate("/signIn");
      return;
    }
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
    <Container className="mt-4">
      <h2 className="text-success text-center fw-bold mb-4">🛒 Blinkit Cart</h2>

      {/* Filter & Sort */}
      <Row className="mb-3">
        <Col md={4} xs={12}>
          <Form.Group>
            <Form.Label>Filter by Category</Form.Label>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4} xs={12}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="title">Product Name</option>
              <option value="price">Price</option>
              <option value="unit">Unit</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4} xs={12}>
          <Form.Group>
            <Form.Label>Order</Form.Label>
            <Form.Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">🔝 Ascending</option>
              <option value="desc">⏬ Descending</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Product List */}
      {isLoading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {paginatedProducts.map((prod) => (
              <Col key={prod.id}>
                <Card className="shadow-sm border-0 h-100">
                  <Card.Img
                    variant="top"
                    src={prod.image}
                    height={180}
                    style={{
                      objectFit: "contain",
                      backgroundColor: "#f8f9fa",
                    }}
                  />
                  <Card.Body className="d-flex flex-column p-3">
                    <Card.Title className="fs-6 fw-bold text-truncate">
                      {prod.title}
                    </Card.Title>
                    <Card.Text className="small text-muted mb-2">
                      {prod.desc}
                    </Card.Text>
                    <Badge
                      bg="warning"
                      text="dark"
                      className="mb-3"
                      style={{ width: "fit-content" }}
                    >
                      {prod.category}
                    </Badge>
                    <div className="fw-bold text-dark mb-1">
                      ₹ {prod.price}
                    </div>
                    <div className="text-muted small mb-2">
                      Unit: <strong>{prod.unit || "1 kg"}</strong>
                    </div>
                    <div className="d-flex justify-content-between gap-2">
                      <Button
                        variant="info"
                        size="sm"
                        onClick={() => setSelectedProduct(prod)}
                      >
                        View👁️
                      </Button>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleEdit(prod.id)}
                      >
                        Edit✏️
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(prod.id)}
                      >
                        Delete🗑️
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          )}
        </>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            zIndex: 1050,
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <Card
            className="p-3"
            style={{ width: "400px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card.Img
              variant="top"
              src={selectedProduct.image}
              height={250}
              style={{ objectFit: "contain", backgroundColor: "#f8f9fa" }}
            />
            <Card.Body>
              <Card.Title>{selectedProduct.title}</Card.Title>
              <Card.Text>{selectedProduct.desc}</Card.Text>
              <Badge bg="warning" text="dark" className="mb-2">
                {selectedProduct.category}
              </Badge>
              <div className="fw-bold">₹ {selectedProduct.price}</div>
              <div className="text-muted">Unit: {selectedProduct.unit}</div>
              <Button
                variant="dark"
                className="mt-3"
                onClick={() => setSelectedProduct(null)}
              >
                Close✖️
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default Home;
