import CheckoutSteps from '../CheckoutSteps';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import Message from '../Message';
import { useOrderActions, useShipping, useTypedSelector, useUserActions } from '../../hooks';
import Link from 'next/link';

const PlaceOrder = () => {
  const { cart } = useTypedSelector(state => state);
  const { error } = useTypedSelector(state => state.order);
  const { createOrder } = useOrderActions();


  const {
    data
  } = useTypedSelector(state => state.user);

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
    <section className="section-4" >
      <h1 className="heading-1">Su orden</h1>
      <div className="columns-2 w-row">
        <div className="column-5 w-col w-col-8 px-0">
          <div className="orderitem">
            <h5 style={{marginLeft: 0}}>Datos de envío</h5>
            <div className="container-item-order">
            <div className="txtordersubitem">Nombre: { data ? <b> {data?.name} </b> : <i style={{color: 'red'}}>Debe loguearse para completar la compra</i>}</div>
            <div className="txtordersubitem">Email: { data ? <b> {data?.email} </b> : <i style={{color: 'red'}}>Debe loguearse para completar la compra</i>}</div>
            <div className="txtordersubitem">Dirección: <b>{cart.data.shippingDetails.address} - {cart.data.shippingDetails.zoneDeliver}</b></div>
            <div className="txtordersubitem">Horario de entrega: <b>{cart.data.shippingDetails.timeDeliver}</b> </div>
            <div className="txtordersubitem">En caso de no existir stock: <b>{cart.data.shippingDetails.stockOption} </b></div>
            </div>
          </div>
          <div className="orderitem">
          </div>
          <div className="orderitem" style={{marginTop: "30px"}}>
            <div className="txtorderitem">Items</div>
            <div className='container-item-order'>
            {cart.data.cartItems.length === 0 ? (
              <Message>El carro está vacío</Message>
            ) : (
              <ListGroup variant="flush">
                  {cart.data.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row style={{fontSize: 14, color: 'black', fontWeight: 700}}>
                  *
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
        </div>
        <div className="column-6 w-col w-col-4 ">
          <div className="ordersummary px-4 d-flex" style={{width: '100%'}}>
            <div className="itemordersummary d-flex col pb-2">
              <div className="txtitemordersummary">Cantidad de productos :</div>
              <div className="txtitemordersummary">{totalProductos}</div>
            </div>
            <div className="itemordersummary pb-3" >
              <div className="txtitemordersummary fs-3">Total :</div>
              <div className="txtitemordersummary fs-3">${(cart.data.itemsPrice)}</div>
            </div>
            <Button
              type="button"
              className="btn-block"
              disabled={cart.data.cartItems.length === 0}
              onClick={onPlaceOrderHandler}
              >
              Confirmar pedido
            </Button>            
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
