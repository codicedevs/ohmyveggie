import { OrdersState, OrderState } from "./order.state";

const order = {
  orderItems: [],
  shippingDetails: {
    address: "",
    country: "",
    city: "",
    postalCode: "",
    timeDeliver: "",
    zoneDeliver: "",
    stockOption: "",
    telephone: 0,
  },
  paymentMethod: "Mercado Pago",
  taxPrice: 0,
  shippingPrice: 0,
  itemsPrice: 0,
  totalPrice: 0,
};

export const orderInitialState: OrderState = {
  loading: false,
  error: null,
  data: order,
  success: false,
};

export const ordersInitialState: OrdersState = {
  loading: false,
  error: null,
  data: null,
};
