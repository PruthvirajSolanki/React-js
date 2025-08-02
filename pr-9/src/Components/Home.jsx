import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
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
import { useNavigate } from "react-router";

const Home = ({ searchTerm = "" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products = [], loading = false } = useSelector(
    (state) => state.productReducer || {}
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAllProductAsync());
  }, [dispatch]);

  const handleEdit = (id) => navigate(`/edit-product/${id}`);
  const handleDelete = (id) => dispatch(deleteProduct(id));

 
  const categories = ["All", ...new Set(products.map((p) => p.category))];


  const filteredProducts = products.filter((prod) => {
    const matchesSearch = prod.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || prod.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });


  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const valA = a[sortField]?.toString().toLowerCase();
    const valB = b[sortField]?.toString().toLowerCase();
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

  const paginationItems = [];
  for (let page = 1; page <= totalPages; page++) {
    paginationItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </Pagination.Item>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="text-success text-center fw-bold mb-4">🛒 Blinkit Cart</h2>

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
              <option value="productName">Product Name</option>
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
              <option value="asc">🔝Ascending</option>
              <option value="desc">⏬Descending</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {loading ? (
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
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleEdit(prod.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(prod.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {sortedProducts.length > 5 && totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>{paginationItems}</Pagination>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
