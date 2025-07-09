// https://themes.templatescoder.com/pizzon/html/demo/1-2/02-Classic/reservation.html
import './Footer.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import footer from '../assets/images/footer.png';
import { Container } from 'react-bootstrap';
import { RiArrowUpSLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="footer">
        <Container style={{ maxWidth: '1200px'}}>
      <div className="footer-container" >
        <div className="footer-col">
          <div className="footer-logo">
            <img src={footer} alt="footer logo" />
          </div>
          <div className="footer-p" >
          <p>20 Carrochan Rd, Balloch, Alexandria G83 8EG, UK
            69QJ+2F Alexandria, United Kingdom</p>
          </div>
          <div className="calls">
          <p>PHONE - <span>+91 123 456 789 0</span>  <span>+91 123 456 789 0,</span></p>
          <p>EMAIL - <span>info@gmail.com</span></p>
          </div>
        </div>

        <div className="footer-col">
          <h2>OPENING HOURS</h2>
          <div className="footer-p1">
          <p>Mon - Tues : <span>6.00 am - 10.00 pm</span></p>
          <p>Wednes - Thurs : <span>6.00 am - 10.00 pm</span></p>
          <p>Launch : <span>Everyday</span></p>
          <p>Sunday : <span className="closed">Closed</span></p>
          </div>
        </div>

        <div className="footer-col">
          <h2>USEFUL LINKS</h2>
          <ul>
            <li>Privacy Policy</li>
            <li>Order Tracking</li>
            <li>Warranty and Services</li>
            <li>About</li>
            <li>Contact Us</li>
            <li>Wishlist</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Pizzon all Rights Reserved. Designed by <span className="design">TemplatesCoder</span></p>
        <div className="social-icons">
          <FaFacebookF />
          <FaTwitter />
          <FaLinkedinIn />
          <FaInstagram />
        </div>
      </div>

      <div className="scroll-top-btn">
        <RiArrowUpSLine />
      </div>
      </Container>
    </footer>
  );
};

export default Footer;
