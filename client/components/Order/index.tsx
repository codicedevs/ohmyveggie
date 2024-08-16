import { Row, Col, ListGroup, Button, Modal, Form } from "react-bootstrap";
import Link from "next/link";
import { useOrderActions, useTypedSelector } from "../../hooks";
import Loader from "../Loader";
import Message from "../Message";
import { useEffect, useState } from "react";
import { OrderInterface } from "../../interfaces";
import { useRouter } from "next/router";
import { proshopAPI } from "../../lib";

interface OrderProps {
  pageId: string | string[] | undefined;
}

const Order: React.FC<OrderProps> = ({ pageId: orderId }) => {
  const [mercadoPagoUrl, setMercadoPagoUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { loading, data, error, success } = useTypedSelector(
    (state) => state.order
  );

  const user = useTypedSelector((state) => state.user);
  const { fetchOrder, deliverOrder, updateOrder } = useOrderActions();
  const [observation, setObservation] = useState();
  const router = useRouter();

  const createPaymentPreference = async (paymentData: OrderInterface) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    try {
      const response = await proshopAPI.post(
        "/payments/preference",
        paymentData,
        config
      );
      if (response.status === 201) {
        setMercadoPagoUrl(response.data.preference.init_point);
        setModalIsOpen(true);
      }
      return { success: true };
    } catch (error) {
      return { success: false, error: "error" };
    }
  };

  const delivered = () => {
    deliverOrder(data._id!);
  };

  const handleClose = () => {
    fetchOrder(orderId as string);
    setModalIsOpen(false);
  };

  useEffect(() => {
    fetchOrder(orderId as string);
  }, [orderId]);

  const handleChange = (e: any) => {
    setObservation(e.target.value);
  };

  const items = data.orderItems;
  var totalProductos = 0;
  items.forEach(function (item) {
    totalProductos += item.qty;
  });

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Modal size="xl" show={modalIsOpen} onHide={handleClose}>
        <iframe src={mercadoPagoUrl} style={{ minHeight: 750 }} />
      </Modal>
      <section
        className="section-4 "
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div style={{ width: "100%", marginBottom: 30 }}>
          {data.isDelivered && data.isPaid ? (
            <h1 className="heading-2"> Orden Finalizada nro: {data._id}</h1>
          ) : (
            <>
              <h1 style={{ paddingBottom: 0 }}>Orden Pendiente nro: </h1>
              <p style={{ fontSize: 15, fontWeight: 400 }}>{data._id}</p>
            </>
          )}
        </div>
        <div className="columns-2 w-row">
          <div className="column-5 w-col w-col-8">
            <div className="orderitem">
              <div className="container-item-order">
                <div className="txtordersubitem">
                  Nombre : <b>{data?.user?.name}</b>
                </div>
                <div className="txtordersubitem">
                  Email :{" "}
                  <a
                    className="txtordersubitem"
                    href={`mailto:${data?.user?.email}`}
                  >
                    <b>{data?.user?.email}</b>
                  </a>
                </div>
                <div className="txtordersubitem">
                  Dirección :
                  <b>
                    {data.shippingDetails.address},{" "}
                    {data.shippingDetails.zoneDeliver},{" "}
                    {data.shippingDetails.postalCode},{" "}
                    {data.shippingDetails.country}
                  </b>
                </div>
                <div className="txtordersubitem">
                  Teléfono: <b>{data?.shippingDetails.telephone}</b>
                </div>
                <div className="txtordersubitem">
                  Forma de entrega: <b>{data?.shippingDetails.timeDeliver}</b>
                </div>
                <div className="txtordersubitem">
                  Si no hay stock: <b>{data?.shippingDetails.stockOption}</b>
                </div>
              </div>
            </div>
            <div
              id="itemStateContainer"
              className="orderitem"
              style={{
                display: "flex",
                flexDirection: "column-reverse",
                gap: 10,
                margin: "20px 0",
              }}
            >
              <div className="d-flex gap-3" id="stateOrder">
                {data.isDelivered ? (
                  <div
                    className="deliveredpaid true"
                    style={{ width: 180, textAlign: "center", height: 60 }}
                  >
                    Pedido enviado el {data.deliveredAt?.slice(3, 10)}
                  </div>
                ) : (
                  <div
                    className="deliveredpaid"
                    style={{ width: 180, textAlign: "center" }}
                  >
                    Pedido no enviado
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
                {data.isPaid && (
                  <div>
                    <div className="txtorderitem">Datos del pago</div>
                    <div className="txtordersubitem">{data.paymentMethod}</div>
                  </div>
                )}
              </div>
              <div className="orderitem mb-4" id="itemsOrder">
                <div className="txtorderitem">Items</div>
                {data.orderItems.length === 0 ? (
                  <Message>El carro está vacío</Message>
                ) : (
                  <ListGroup variant="flush">
                    {data.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row style={{ fontWeight: 600 }}>
                          <Col>
                            <Link href={`/product/${item.productId}`} passHref>
                              <span className="link__span">{item.name}</span>
                            </Link>
                          </Col>
                          <Col style={{ textAlign: "right" }} md={4}>
                            {item.qty} x ${item.price}
                          </Col>
                          <Col
                            style={{
                              textAlign: "right",
                              fontSize: 18,
                              fontWeight: 700,
                            }}
                            md={4}
                          >
                            $ {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </div>
            </div>
          </div>
          <div className="column-6 w-col w-col-4">
            <div className="ordersummary px-4 d-flex">
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
                    backgroundColor: "#bae1be11",
                  }}
                >
                  {loading && <Loader />}

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src="/images/mercado-pago.png"
                      style={{ marginBottom: "15px" }}
                    ></img>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={() => createPaymentPreference(data)}
                    >
                      Pagar
                    </Button>
                  </div>
                </ListGroup.Item>
              )}
              {loading && <Loader />}
              {user.data &&
                user.data.isAdmin &&
                data.isPaid &&
                !data.isDelivered && (
                  <ListGroup.Item
                    style={{
                      border: "none",
                      display: "flex",
                      justifyContent: "center",
                      backgroundColor: "#bae1be11",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={delivered}
                      >
                        Marcar como entregado
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
            </div>
          </div>
        </div>
        {user.data?.isAdmin ? (
          <div className="txtArea">
            <div className="txtorderitem">Observaciones</div>
            <Form.Control
              style={{
                marginTop: "10px",
                marginBottom: "20px",
                border: "1px",
                backgroundColor: "#ddd",
                borderRadius: "10px",
              }}
              as="textarea"
              rows={3}
              value={
                observation === undefined ? data.observations : observation
              }
              onChange={handleChange}
            />
            <Button
              onClick={() => updateOrder(data._id!, observation)}
              disabled={loading}
            >
              {loading ? "Loading…" : "Guardar"}
            </Button>
          </div>
        ) : null}
      </section>
    </>
  );
};

export default Order;
