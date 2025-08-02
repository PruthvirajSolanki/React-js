import { useEffect, useState } from "react";
import { getStorageData, setStorageData } from "../Services/Service";
import {
  Badge,
  Button,
  Card,
  Container,
  Form,
  Row,
  Col,
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Home.css";

const Home = ({ searchTerm }) => {
  const [productData, setProductData] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    let data = getStorageData();
    let updateData = data.filter((product) => product.id !== id);
    setStorageData(updateData);
    setProductData(updateData);
  };

  const sortData = (data, field, order) => {
    return [...data].sort((a, b) => {
      const aVal = a[field] || "";
      const bVal = b[field] || "";

      if (field === "price" || field === "pincode") {
        return order === "asc" ? aVal - bVal : bVal - aVal;
      }

      return order === "asc"

        ? aVal.toString().localeCompare(bVal.toString())
        : bVal.toString().localeCompare(aVal.toString());
    });
  };

  useEffect(() => {
    let data = getStorageData(); 
    if (sortField) {
      data = sortData(data, sortField, sortOrder);
    }
    setProductData(data);
  }, [sortField, sortOrder]);   

  const handleSortFieldChange = (e) => {
    setSortField(e.target.value);
    setCurrentPage(1);``
  };

  const handleSortOrderToggle = () => { 
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };


  const filteredProducts = productData.filter((product) =>
    product.productName.includes(searchTerm)
  );


  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedData = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <Container className="py-4">
      <h2
        className="mb-4 text-center"
        style={{ color: "#4a148c", fontWeight: 700 }}
      >
        📦 Product Showcase
      </h2>

      <Row className="mb-4 justify-content-center">
        <Col xs={6} md={4}>
          <Form.Select value={sortField} onChange={handleSortFieldChange}>
            <option value="" disabled hidden>
              Sort By...
            </option>
            <option value="productName">Product Name</option>
            <option value="category">Category</option>
            <option value="price">Price</option>
            <option value="warranty">Warranty</option>
            <option value="pincode">Delivery Pincode</option>
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Button variant="outline-dark" onClick={handleSortOrderToggle}> 
            {sortOrder === "asc" ? "🔝 Ascending" : "⏬ Descending"}
          </Button>
        </Col>
      </Row> 

      <div className="row g-4 justify-content-center">
        {paginatedData.length > 0 ? (
          paginatedData.map((product) => (
            
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={product.id}
            >
              <Card
                className="h-100 shadow-sm border-0"
                style={{ borderRadius: "1rem", transition: "transform 0.2s" }}
              >
                <Card.Img  
                  variant="top"
                  src={product.image}
                  style={{
                    height: 180,
                    objectFit: "contain",
                    borderTopLeftRadius: "1rem",
                    borderTopRightRadius: "1rem",
                    backgroundColor: "#fafafa",
                    padding: 20,  
                  }}
                />
                <Card.Body className="d-flex flex-column p-3">
                  <h5 style={{ fontWeight: "600" }}>{product.productName}</h5>
                  <p className="text-muted small mb-2">{product.desc}</p>
                  <Badge
                    bg="success"
                    text="dark"
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    {product.category}
                  </Badge>
                  <p
                    className="mb-1"
                    style={{ fontSize: "0.95rem", color: "#424242" }}
                  >
                    <strong>₹{product.price}</strong>
                  </p>
                  <p
                    className="text-secondary mb-3"
                    style={{ fontSize: "0.95rem" }}
                  >
                    <strong> Warranty: </strong> {product.warranty || "N/A"}
                  </p>
                  <p
                    className="text-secondary mb-3"
                    style={{ fontSize: "0.9rem" }}
                  >
                    <strong> Pincode: </strong>
                    {product.pincode || "N/A"}
                  </p>

                  <div className="d-flex gap-2 mt-auto">
                    <Button
                      onClick={() => handleEdit(product.id)}
                      variant="outline-info"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id)}
                      variant="outline-danger"
                      size="sm"
                    >
                      🗑 Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center mt-5 text-muted">No products found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <Row className="justify-content-center mt-4">
          <Col xs="auto">
            <Pagination>
              <Pagination.First
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Home;
