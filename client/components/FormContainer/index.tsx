import { Col, Container, Row } from 'react-bootstrap';

const FormContainer: React.FC = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
          {children}
      </Row>
    </Container>
  );
};

export default FormContainer;

/*<Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container> */
