// https://themes.templatescoder.com/pizzon/html/demo/1-2/02-Classic/reservation.html
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import logo from '../assets/images/header.png';
import { IoCallOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi";
import './Header.css'


const Header = () => {
  return (
    
    
    <Navbar expand="lg" className="sticky-top" style={{backgroundColor: '#121619'}}>
      <Container fluid className="d-flex justify-content-between align-items-center px-4" style={{ maxWidth: '1200px' }}>
        
        <Navbar.Brand href="#">
          <img src={logo} alt="header-logo" width={150} />
        </Navbar.Brand>

          <Nav className="index-header">
            <Nav.Link href="#home"  className="nav-link" style={{ color: 'white' , fontSize:'16px'}}>Home</Nav.Link>
             <NavDropdown title="Menu" id="menu-dropdown" className="nav-link-custom dropdown-custom">
            <NavDropdown.Item href="#about-us">Menu list</NavDropdown.Item>
            <NavDropdown.Item href="#contact">Menu grid</NavDropdown.Item>
            <NavDropdown.Item href="#shop-grid">Special Pizza</NavDropdown.Item>
            <NavDropdown.Item href="#404">All pizza</NavDropdown.Item>
          </NavDropdown>
            
            {/* <Nav.Link href="#menu" className="nav-link" style={{ color: 'white' , fontSize:'16px'}}>Menu</Nav.Link> */}

             <NavDropdown title="Blog" id="blog-dropdown" className="nav-link-custom dropdown-custom">
            <NavDropdown.Item href="#blog-left">Blog Leftside</NavDropdown.Item>
            <NavDropdown.Item href="#blog-right">Blog Rightside</NavDropdown.Item>
            <NavDropdown.Item href="#blog-detail">Blog Detail</NavDropdown.Item>
          </NavDropdown>
            <Nav.Link href="#reservation" className="nav-link" style={{ color: 'white' , fontSize:'16px'}}>Reservation</Nav.Link>
            
             <NavDropdown title="Pages" id="pages-dropdown" className="nav-link-custom dropdown-custom">
            <NavDropdown.Item href="#about-us">About Us</NavDropdown.Item>
            <NavDropdown.Item href="#contact">Contact</NavDropdown.Item>
            <NavDropdown.Item href="#shop-grid">Shop Grid</NavDropdown.Item>
            <NavDropdown.Item href="#404">404</NavDropdown.Item>
          </NavDropdown>
          </Nav>
      

        <div className="d-flex align-items-center gap-3">
          <div className="d-flex align-items-center text-white phone-icon-hover">
            <IoCallOutline className="me-2 header-icon" />
            +91 123 456 789
          </div>
          <div className="d-flex align-items-center text-white">
            <HiOutlineShoppingBag className="me-2 header-icon" />
            0 items - <span className="ms-1">$0.00</span>
          </div>
          <button className="order-button">
            ORDER ONLINE
          </button>
        </div>

       
       </Container>
    
    </Navbar>
   

 );
};

export default Header;
