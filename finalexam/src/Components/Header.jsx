import { Container } from "react-bootstrap";
import { FaCoffee, FaHome, FaTshirt } from "react-icons/fa";
import { MdToys, MdPhoneIphone } from "react-icons/md";
import { GiFruitBowl, GiLipstick } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { FiUser, FiSearch, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; 
import logo from "../assets/images/logo.svg";

// images
import fruits from "../assets/images/fruits.png";
import atta from "../assets/images/atta.png";
import masala from "../assets/images/masala.png";
import zepto from "../assets/images/zepto.png";
import sweets from "../assets/images/sweets.png";
import toys from "../assets/images/toys.png";
import life from "../assets/images/life.png";
import jewellery from "../assets/images/jewellery.png";
import food from "../assets/images/food.png";
import icecream from "../assets/images/icecream.png";
import maggie from "../assets/images/maggie.png";
import paan from "../assets/images/paan.png";


// import { logoutUser } from "../Services/Actions/userAction"; 

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.userReducer);

  // const handleLogout = () => {
  //   dispatch(logOutAsync());
  //   navigate("/signIn");
  // };

  const topCategories = [
    { label: "All", icon: <IoFastFood size={20} /> },
    { label: "Cafe", icon: <FaCoffee size={20} /> },
    { label: "Home", icon: <FaHome size={20} /> },
    { label: "Toys", icon: <MdToys size={20} /> },
    { label: "Fresh", icon: <GiFruitBowl size={20} /> },
    { label: "Electronics", icon: <RiComputerLine size={20} /> },
    { label: "Mobiles", icon: <MdPhoneIphone size={20} /> },
    { label: "Beauty", icon: <GiLipstick size={20} /> },
    { label: "Fashion", icon: <FaTshirt size={20} /> },
  ];

  const subCategories = [
    { img: fruits, label: "Fruits & Vegetables" },
    { img: atta, label: "Atta, Rice, Oil & Dals" },
    { img: masala, label: "Masala & Dry Fruits" },
    { img: zepto, label: "Zepto Cafe" },
    { img: sweets, label: "Sweet Cravings" },
    { img: toys, label: "Toys & Sports" },
    { img: life, label: "Apparel & Lifestyle" },
    { img: jewellery, label: "Jewellery & Accessories" },
    { img: food, label: "Frozen Food" },
    { img: icecream, label: "Ice Creams & More" },
    { img: maggie, label: "Packaged Food" },
  ];

  return (
    <div>
      {/* 🔹 Header Top Section */}
      <div
        style={{
          background: "linear-gradient(90deg, #f8e9ff, #f3f0ff)",
          padding: "8px 16px",
        }}
      >
        <Container
          style={{ maxWidth: "1670px", height: "90px" }}
          className="d-flex align-items-center justify-content-between"
        >
          {/* Logo → Navigate Home */}
          <div
            className="d-flex align-items-center gap-2"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="logo" style={{ width: "90px" }} />
            <span className="fw-bold text-dark">Select Location ▼</span>
          </div>

          {/* Search Bar */}
          <div
            style={{
              flex: 1,
              margin: "0 40px",
              display: "flex",
              alignItems: "center",
              background: "#fff",
              borderRadius: "8px",
              padding: "6px 12px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            <FiSearch size={18} style={{ marginRight: "8px", color: "#777" }} />
            <input
              type="text"
              placeholder='Search for "banana"'
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: "14px",
              }}
            />
          </div>

          {/* Login / User Info + Add Product */}
          <div className="d-flex align-items-center gap-4">
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-1">
                  <FiUser size={20} />
                  <span>{user.email}</span>
                </div>
                {/* ✅ Logout button */}
                <button
                  style={{
                    background: "#dc3545",
                    border: "none",
                    borderRadius: "20px",
                    padding: "6px 16px",
                    color: "#fff",
                    fontWeight: "500",
                    cursor: "pointer",
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <FiLogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div
                className="d-flex align-items-center gap-1"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/signin")}
              >
                <FiUser size={20} />
                <span>Login</span>
              </div>
            )}

            <button
              onClick={() => navigate("/add-product")}
              style={{
                background: "#bf642cff",
                border: "none",
                borderRadius: "20px",
                padding: "6px 16px",
                color: "#fff",
                fontWeight: "500",
                cursor: "pointer",
                boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
              }}
            >
              Add Product
            </button>
          </div>
        </Container>
      </div>

      {/* ✅ TOP NAV ICON BAR */}
      <div className="border-bottom bg-white">
        <Container className="d-flex justify-content-start gap-4 py-2">
          {topCategories.map((cat, idx) => (
            <div
              key={idx}
              className="d-flex flex-column align-items-center text-center"
              style={{
                cursor: "pointer",
                color: idx === 0 ? "#7b2cbf" : "#444",
              }}
            >
              {cat.icon}
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: idx === 0 ? "600" : "400",
                }}
              >
                {cat.label}
              </span>
              {idx === 0 && (
                <div
                  style={{
                    height: "3px",
                    width: "100%",
                    background: "#7b2cbf",
                    marginTop: "2px",
                    borderRadius: "2px",
                  }}
                />
              )}
            </div>
          ))}
        </Container>
      </div>

      {/* ✅ SUB-CATEGORIES SCROLL */}
      <div className="bg-white border-bottom py-3">
        <Container
          style={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            gap: "30px",
          }}
        >
          {subCategories.map((cat, index) => (
            <div
              key={index}
              style={{
                textAlign: "center",
                flex: "0 0 auto",
                cursor: "pointer",
              }}
            >
              <img
                src={cat.img}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "8px",
                }}
              />
              <div style={{ fontSize: "14px", fontWeight: "500" }}>
                {cat.label}
              </div>
            </div>
          ))}
        </Container>
      </div>

      {/* ✅ PAAN CORNER BANNER */}
      <div className="my-3">
        <Container>
          <img
            src={paan}
            alt="Paan Corner"
            style={{
              width: "100%",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        </Container>
      </div>
    </div>
  );
};

export default Header;
