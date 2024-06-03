import { Nav } from 'react-bootstrap';
import Link from 'next/link';

const CheckoutSteps = ({  step1, step2 }: any) => {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Link href="/shipping" passHref >
            <Nav.Link style={{fontSize: 20, fontWeight:500}}>Envío</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Datos del Envío</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {step2 ? (
          <Link href="/placeorder" passHref>
            <Nav.Link style={{fontSize: 20, fontWeight:500}}>Orden</Nav.Link>
          </Link>
        ) : (
          <Nav.Link disabled>Orden</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
