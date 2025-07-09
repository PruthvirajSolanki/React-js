// https://themes.templatescoder.com/pizzon/html/demo/1-2/02-Classic/reservation.html
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Reservation.css';

const Reservation = () => {
  return (
    <section className="reservation-section" >
      <Container style={{ maxWidth: '1200px'}}>
        <div className="text-center mb-5">
          <h5 className="reservation-subtitle">Make Online Reservation</h5>     
          <h1 className="reservation-title">BOOK A TABLE</h1>
        </div>

        <Form className="reservation-form" >
          <Row className="mb-3">
            <Col md={6}>
              <Form.Select required>
                <option value="">Hour</option><hr/>
                <option>minute</option><hr/>
                <option>second</option><hr/>
              </Form.Select>
            </Col>
            <Col md={6}>
        <Form.Select required defaultValue="">
                <option value="" disabled hidden>Number Of People</option>
                <option>1</option><hr/>
                <option>2</option><hr/>
                <option>3</option><hr/>
        </Form.Select>

            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Control type="text" required placeholder="Pick a Date" />
            </Col>
            <Col md={6}>
              <Form.Control type="text" required placeholder="Phone Number" />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Control type="text" required placeholder="Name" />
            </Col>
            <Col md={6}>
              <Form.Control type="email" required placeholder="Email Address" />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <Form.Control as="textarea" placeholder="Comments" rows={1} />
            </Col>
          </Row>

          <div className="text-center">
            <Button type="submit" className="book-button" style={{ width: '40%'}}>BOOK A TABLE</Button>
          </div>
        </Form>
      </Container>
    </section>
  );
};

export default Reservation;
