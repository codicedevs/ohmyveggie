import CheckoutSteps from '../CheckoutSteps';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../Message';
import { useOrderActions, useShipping, useTypedSelector } from '../../hooks';
import Link from 'next/link';

const PlaceOrder = () => {
  useShipping();

  const { cart } = useTypedSelector(state => state);
  const { error } = useTypedSelector(state => state.order);
  const { createOrder } = useOrderActions();

  const onPlaceOrderHandler = () => {
    const {
      itemsPrice,
      cartItems,
      paymentMethod,
      shippingDetails,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = cart.data;

    createOrder({
      paymentMethod,
      shippingDetails,
      shippingPrice,
      taxPrice,
      totalPrice,
      itemsPrice,
      orderItems: cartItems,
    });
  };


  // calculo cantidad de productos (total)
  const items = cart.data.cartItems;
  var totalProductos = 0;
  items.forEach(function(item) {
    totalProductos += item.qty;
  })


  return (

    <section className="section-4">
      <CheckoutSteps step1 step2 step3 step4/>
      <h1 className="heading-3">Orden</h1>
      <div className="columns-2 w-row">
        <div className="column-5 w-col w-col-8">
          <div className="orderitem">
            <div className="txtorderitem">Envío</div>
            <div className="txtordersubitem">Nombre :</div>
            <div className="txtordersubitem">Email :</div>
            <div className="txtordersubitem">Dirección : {cart.data.shippingDetails.address}</div>
            {/* <div className="deliveredpaid">Pedido no enviado</div>
            <div className="deliveredpaid true">Pedido enviado</div> */}
          </div>
          <div className="orderitem">
            <div className="txtorderitem">Método de pago</div>
            <div className="txtordersubitem">{cart.data.paymentMethod}</div>
            {/* <div className="deliveredpaid paid">Pedido no pago</div>
            <div className="deliveredpaid true">Pedido pago</div> */}
          </div>
          <div className="orderitem">
            <div className="txtorderitem">Items</div>
            {cart.data.cartItems.length === 0 ? (
                <Message>El carro está vacío</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.data.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        
                        <Col>
                          <Link href={`/product/${item.productId}`} passHref>
                            <span className="link__span">{item.name}</span>
                          </Link>
                        </Col>
                        <Col style={{textAlign: 'right'}} md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
          </div>
        </div>
        <div className="column-6 w-col w-col-4">
          <div className="ordersummary">
            <div className="itemordersummary">
              <div className="txtitemordersummary">Items :</div>
              <div className="txtitemordersummary">{totalProductos}</div>
            </div>
            <div className="itemordersummary">
              <div className="txtitemordersummary">Total :</div>
              <div className="txtitemordersummary">${(cart.data.itemsPrice)}</div>
            </div>
            <Button
              type="button"
              className="btn-block"
              disabled={cart.data.cartItems.length === 0}
              onClick={onPlaceOrderHandler}
            >
              Realizar pedido
            </Button>
            {/* <div className="div-block-25">Pagar</div> */}
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default PlaceOrder;

/*<>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.data.shippingDetails.address},{' '}
                {cart.data.shippingDetails.city}{' '}
                {cart.data.shippingDetails.postalCode},{' '}
                {cart.data.shippingDetails.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.data.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.data.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.data.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link href={`/product/${item.productId}`} passHref>
                            <span className="link__span">{item.name}</span>
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = $
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.data.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    {cart.data.shippingPrice !== 0
                      ? `$${cart.data.shippingPrice}`
                      : 'Free'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.data.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.data.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.data.cartItems.length === 0}
                  onClick={onPlaceOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>*/
