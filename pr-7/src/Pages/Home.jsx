import { useEffect, useState } from "react";
import { getStorageData, setStorageData } from "../Services/Service";
import { Badge, Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import "./Home.css";

const Home = () => {
  const [productData, setProductData] = useState([]);
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

  useEffect(() => {
    let data = getStorageData();
    setProductData(data);
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center" style={{ color: "#4a148c", fontWeight: 700 }}>
        📦 Product Showcase
      </h2>
      <div className="row g-4 justify-content-center">
        {productData.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
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
                <Badge bg="success" text="dark" className="mb-3" style={{ width: "fit-content" }}>
                  {product.category}
                </Badge>
                <p className="mb-1" style={{ fontSize: "0.95rem", color: "#424242" }}>
                  <strong>₹{product.price}</strong>
                </p>
                <p className="text-secondary mb-3" style={{ fontSize: "0.95rem" }}>
                 <strong> Warranty: </strong>  {product.warranty || "N/A"}
                </p>
                <p className="text-secondary mb-3" style={{ fontSize: "0.9rem" }}>
                  <strong> Pincode: </strong>{product.pincode || "N/A"}
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
        ))}
      </div>
    </Container>
  );
};

export default Home;