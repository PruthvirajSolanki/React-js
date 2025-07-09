// https://themes.templatescoder.com/pizzon/html/demo/1-2/02-Classic/reservation.html
import { Container } from 'react-bootstrap';
import banner from '../assets/images/banner.jpg';
import './Banner.css';

const Banner = () => {

  return(
     <div className="banner">
      <img src={banner} className="banner-img" alt="Banner" />
         <div className="banner-overlay">
          <Container className="text-center text-white banner-content">
          <h1 className="banner-title">RESERVATION</h1>
          <p className="banner-p">Home / Reservation</p>
        </Container>
      </div>
      </div>
        
      
  );
};

export default Banner;
