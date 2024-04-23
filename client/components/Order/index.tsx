import { Row, Col, ListGroup, Card, Button, Image } from "react-bootstrap";
import { PayPalButton } from "react-paypal-button-v2";
import Link from "next/link";
import { useOrderActions, useTypedSelector } from "../../hooks";
import Loader from "../Loader";
import Message from "../Message";
import { useEffect } from "react";
import { paypalClientId } from "../../utils";

interface OrderProps {
  pageId: string | string[] | undefined;
}

const Order: React.FC<OrderProps> = ({ pageId }) => {
  const { loading, data, error, success } = useTypedSelector(
    (state) => state.order
  );
  const { loading: loadingDeliver } = useTypedSelector(
    (state) => state.orderDeliver
  );
  const user = useTypedSelector((state) => state.user);
  const { fetchOrder, payOrder, deliverOrder } = useOrderActions();

  useEffect(() => {
    if (!data._id || success) {
      if (!pageId) return;

      fetchOrder(pageId as string);
    }
    console.log(data)
  }, [fetchOrder, pageId, success, data]);

  const onPaymentHandler = ({
    id,
    payer: { email_address },
    update_time,
    status,
  }: any) => {
    const paymentResult = {
      id,
      email_address,
      update_time,
      status,
    };

    payOrder(data._id!, paymentResult);
    
  };

  // calculo cantidad de productos (total)
  const items = data.orderItems;
  var totalProductos = 0;
  items.forEach(function (item) {
    totalProductos += item.qty;
  });

  async function delivered(){
    await deliverOrder(data._id!)
    fetchOrder(data._id!)
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <section
        className="section-4"
        style={{ padding: "100px 400px 0px 400px" }}
      >
        {data.isDelivered && data.isPaid ? (
          <h1 className="heading-2"> Orden Finalizada nro: {data._id}</h1>
        ) : (
          <h1 className="heading-2">Orden Pendiente nro: {data._id}</h1>
        )}

        <div className="columns-2 w-row">
          <div className="column-5 w-col w-col-8">
            <div className="orderitem">
              <div className="container-item-order">
                <div className="txtordersubitem">
                  Nombre : {data.user?.name}
                </div>
                <div className="txtordersubitem">
                  Email :{" "}
                  <a
                    className="txtordersubitem"
                    href={`mailto:${data.user?.email}`}
                  >
                    {data.user?.email}
                  </a>
                </div>
                <div className="txtordersubitem">
                  Dirección :{data.shippingDetails.address},
                  {data.shippingDetails.city} {data.shippingDetails.postalCode},{" "}
                  {data.shippingDetails.country}
                </div>
              </div>
            </div>
            <div className="orderitem" style={{ display: "flex", gap: 10 }}>
              {data.isDelivered ? (
                <div
                  className="deliveredpaid true"
                  style={{ width: 180, textAlign: "center", height: 60 }}
                >
                  Pedido enviado el {data.deliveredAt?.slice(3, 10)}
                  {console.log("ís delivered", data.isDelivered)}
                </div>
              ) : (
                <div
                  className="deliveredpaid"
                  style={{ width: 180, textAlign: "center" }}
                >
                  Pedido no enviado
                  {console.log("ís delivered", data.isDelivered)}
                </div>
              )}
              {data.isPaid ? (
                <div>
                  <div
                    className="deliveredpaid true"
                    style={{ width: 180, textAlign: "center", height: 60 }}
                  >
                    Pedido pago el {data.paidAt?.slice(3, 10)}
                  </div>
                </div>
              ) : (
                <div
                  className="deliveredpaid paid"
                  style={{ width: 180, textAlign: "center", height: 60 }}
                >
                  Pedido impago
                </div>
              )}
            </div>
            {data.isPaid && (
              <div>
                <div className="txtorderitem">Datos del pago</div>
                <div className="txtordersubitem">{data.paymentMethod}</div>
              </div>
            )}
            <div className="orderitem">
              <div className="txtorderitem">Items</div>
              {data.orderItems.length === 0 ? (
                <Message>El carro está vacío</Message>
              ) : (
                <ListGroup variant="flush">
                  {data.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col>
                          <Link href={`/product/${item.productId}`} passHref>
                            <span className="link__span">{item.name}</span>
                          </Link>
                        </Col>
                        <Col style={{ textAlign: "right" }} md={4}>
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

          <div className="column-6 w-col w-col-4 ">
            <div className="ordersummary px-4 d-flex" style={{ width: 350 }}>
              <div className="itemordersummary d-flex col pb-2">
                <div className="txtitemordersummary">
                  Cantidad de productos :
                </div>
                <div className="txtitemordersummary">{totalProductos}</div>
              </div>
              <div className="itemordersummary pb-3">
                <div className="txtitemordersummary fs-3">Total :</div>
                <div className="txtitemordersummary fs-3">
                  ${data.itemsPrice.toFixed(2)}
                </div>
              </div>

              {!data.isPaid && (
                <ListGroup.Item
                  style={{
                    border: "none",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {loading && <Loader />}

                  {/* <PayPalButton
                    options={{
                      clientId: paypalClientId,
                    }}
                    amount={data.totalPrice}
                    onSuccess={onPaymentHandler}
                  />  */}
                  {/* <button onClick={()=>onPaymentHandler({id: 123, payer: {email_address: 'abc345@gmail.com'}, update_time: new Date().toISOString(), status: 'ok' })}>Pagar</button> */}

                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={() =>
                      onPaymentHandler({
                        id: 123,
                        payer: { email_address: "abc345@gmail.com" },
                        update_time: new Date().toISOString(),
                        status: "ok",
                      })
                    }
                  >
                    Pagar
                  </Button>
                </ListGroup.Item>
              )}

              {loadingDeliver && <Loader />}

              {user.data &&
                user.data.isAdmin &&
                data.isPaid &&
                !data.isDelivered && (
                  <ListGroup.Item style={{ border: "none" }}>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={delivered}
                    >
                      Marcar como entregado
                    </Button>
                  </ListGroup.Item>
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Order;

/*return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {data._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {data.user?.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${data.user?.email}`}>{data.user?.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {data.shippingDetails.address}, {data.shippingDetails.city}{' '}
                {data.shippingDetails.postalCode},{' '}
                {data.shippingDetails.country}
              </p>
              {data.isDelivered ? (
                <Message variant="success">
                  Delivered on {data.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {data.paymentMethod}
              </p>
              {data.isPaid ? (
                <Message variant="success">Paid on {data.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {data.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {data.orderItems.map((item, index) => (
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
                          <Link href={`/product/${item.productId}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
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
                  <Col>${data.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>
                    {data.shippingPrice !== 0
                      ? `$${data.shippingPrice}`
                      : 'Free'}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${data.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${data.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!data.isPaid && (
                <ListGroup.Item>
                  {loading && <Loader />}

                  {/* <PayPalButton
                    options={{
                      clientId: paypalClientId,
                    }}
                    amount={data.totalPrice}
                    onSuccess={onPaymentHandler}
                  /> }
                  /*<button onClick={()=>onPaymentHandler({id: 123, payer: {email_address: 'abc345@gmail.com'}, update_time: new Date().toISOString(), status: 'ok' })}>PAGAR</button>
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}

              {user.data &&
                user.data.isAdmin &&
                data.isPaid &&
                !data.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={() => deliverOrder(data._id!)}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}; */
