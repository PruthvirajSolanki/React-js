import { Navbar, Container, Form, FormControl, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

import flipkartlogo from "../assets/images/flipkartlogo.svg";
import minutes from "../assets/images/minutes.png";
import mobiles from "../assets/images/mobiles.png";
import fashion from "../assets/images/fashion.png";
import electronics from "../assets/images/electronics.png";
import home from "../assets/images/home.png";
import tv from "../assets/images/tv.jpg";
import flight from "../assets/images/flight.png";
import beauty from "../assets/images/beauty.png";
import grocery from "../assets/images/grocery.png";


const FlipkartHeader = () => {
  const categories = [
    { img: minutes, label: "Minutes" },
    { img: mobiles, label: "Mobiles & Tablets" },
    { img: fashion, label: "Fashion" },
    { img: electronics, label: "Electronics" },
    { img: home, label: "Home & Furniture" },
    { img: tv, label: "TVs & Appliances" },
    { img: flight, label: "Flight Bookings" },
    { img: beauty, label: "Beauty, Food.." },
    { img: grocery, label: "Grocery" },
  ];

  return (
    <>

      <Navbar bg="light" expand="lg" sticky="top" className="py-2 border-bottom shadow-sm" style={{ zIndex: 1030 }}>
        <Container style={{ maxWidth: "1600px" }}>
    
          <Link to="/" className="d-flex align-items-start text-decoration-none">
            <img src={flipkartlogo} alt="Flipkart" height={40} width={160} />
          </Link>


          <Form className="flex-grow-1 mx-3" style={{ maxWidth: "772px" }}>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <FormControl
                type="search"
                placeholder="Search for Products, Brands and More"
                className="border-start-0"
                style={{
                  backgroundColor: "#f0f5ff",
                  borderRadius: "0 5px 5px 0",
                  borderLeft: "none",
                }}
              />
            </div>
          </Form>


          <Nav className="align-items-center gap-3">
            <Nav.Link as={Link} to="/login" className="d-flex align-items-center text-dark fw-semibold">
              <FaUser className="me-1" />
              Login <IoMdArrowDropdown className="ms-1" />
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center text-dark fw-semibold">
              <FaShoppingCart className="me-1" />
              Cart
            </Nav.Link>

            <Link to="/add-product">
              <Button
                style={{
                  backgroundColor: "#ff9f00",
                  borderColor: "#000000ff",
                  fontWeight: "600",
                  color: "#fff",
                  padding: "6px 16px",
                  transition: "background-color 0.3s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#4a148c";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#ff9f00";
                  e.target.style.transform = "scale(1)";
                }}
              >
                Add Product
              </Button>
            </Link>
          </Nav>
        </Container>
      </Navbar>


      <div style={{ backgroundColor: "#fff", padding: "12px 0", borderBottom: "1px solid #ddd" }}>
        <Container
          fluid
          style={{ maxWidth: "1600px" }}
          className="d-flex justify-content-between flex-wrap text-center"
        >
          {categories.map((item, index) => (
            <div
              key={index}
              style={{ width: "90px", cursor: "pointer" }}
              className="d-flex flex-column align-items-center"
            >
              <img
                src={item.img}
                alt={item.label}
                width={63}
                height={63}
                style={{ objectFit: "contain" }}
              />
              <span style={{ fontSize: "14px", marginTop: "12px", fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </Container>
      </div>
    </>
  );
};

export default FlipkartHeader;