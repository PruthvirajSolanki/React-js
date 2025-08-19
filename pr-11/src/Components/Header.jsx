import { Navbar, Container, FormControl, Nav, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { PiShoppingCartLight } from "react-icons/pi";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.svg";

import paan from "../assets/images/paan.png";
import dairy from "../assets/images/dairy.png";
import fruits from "../assets/images/fruits.png";
import drinks from "../assets/images/drinks.png";
import snacks from "../assets/images/snacks.png";
import breakfast from "../assets/images/breakfast.png";   
import sweet from "../assets/images/sweet.png";
import biscuits from "../assets/images/biscuits.png";
import tea from "../assets/images/tea.png";
import atta from "../assets/images/atta.png";
import masala from "../assets/images/masala.png";
import sauces from "../assets/images/sauces.png";
import meat from "../assets/images/meat.png";
import organic from "../assets/images/organic.png";
import baby from "../assets/images/baby.png";
import pharma from "../assets/images/pharma.png";
import cleaning from "../assets/images/cleaning.png";
import home from "../assets/images/home.png";
import personal from "../assets/images/personal.png";
import pet from "../assets/images/pet.png";


const BlinkitHeader = ({ onSearch }) => {
  const categories = [
    { img: paan, label: "Paan Corner" },
    { img: dairy, label: "Dairy, Bread & Eggs" },
    { img: fruits, label: "Fruits & Vegetables" },
    { img: drinks, label: "Cold Drinks & Juices" },
    { img: snacks, label: "Snacks & Munchies" },
    { img: breakfast, label: "Breakfast & Instant Food" },
    { img: sweet, label: "Sweet Tooth" },
    { img: biscuits, label: "Bakery & Biscuits" },
    { img: tea, label: "Tea, Coffee & Health Drink" },
    { img: atta, label: "Atta, Rice & Dal" },
    { img: masala, label: "Masala, Oil & More" },
    { img: sauces, label: "Sauces & Spreads" },
    { img: meat, label: "Chicken, Meat & Fish" },
    { img: organic, label: "Organic & Healthy Living" },
    { img: baby, label: "Baby Care" },
    { img: pharma, label: "Pharma & Wellness" },
    { img: cleaning, label: "Cleaning Essentials" },
    { img: home, label: "Home & Office" },
    { img: personal, label: "Personal Care" },
    { img: pet, label: "pet" },

    ];

  return (
    <>
      <Navbar bg="white" expand="lg" sticky="top" className="shadow-sm border-bottom py-2">
        <Container style={{ maxWidth: "1666px", height: "86px" }} className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <Link to="/" className="text-decoration-none d-flex align-items-center me-4">
              <img src={logo} alt="Blinkit" height={30} width={134} />
            </Link>
            <div>
              <div style={{ fontWeight: 800 }}>Delivery in 11 minutes</div>
              <div style={{ fontSize: "14px", color: "#555" }}>
                Sarthana Jakat Naka, Nana Varachha ▼
              </div>
            </div>
          </div>

          <div className="flex-grow-1 mx-4" style={{ height: "47px", width: "844px" }}>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaSearch className="text-muted" />
              </span>
              <FormControl
                type="search"
                placeholder='Search "Chips"'
                onChange={(e) => onSearch(e.target.value)}
                style={{
                  backgroundColor: "#f8f8f8",
                  borderLeft: "none",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
              />
            </div>
          </div>

          <Nav className="align-items-center gap-4">
            <Nav.Link as={Link} to="/login" className="text-dark fw-semibold">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/add-product" className="text-dark d-flex align-items-center">
              <Button
                className="d-flex align-items-center justify-content-center gap-2"
                style={{
                  backgroundColor: "#03831f",
                  border: "none",
                  fontWeight: "600",
                  color: "#fff",
                  padding: "6px 16px",
                  height: "52px",
                  width: "112px",
                  transition: "background-color 0.3s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#cccccc";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#03831f";
                  e.target.style.transform = "scale(1)";
                }}
              >
                <PiShoppingCartLight style={{ height: "50px", width: "50px" }} />
                Add Product
              </Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>


      <div className="bg-white border-bottom py-3">
        <Container style={{ maxWidth: "1320px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
            }}
          >
            {categories.map((cat, index) => (
            <div key={index} style={{ textAlign: "center" }}>
              <img src={cat.img} alt={cat.label} style={{
                width: "129px",
                height: "188px",
                borderRadius: "12px",
                objectFit: "contain",
                marginBottom: "8px",
            }}/>
            </div>
            ))}

          </div>
        </Container>
      </div>
    </>
  );
};

export default BlinkitHeader;