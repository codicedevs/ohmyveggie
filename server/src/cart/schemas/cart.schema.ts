import { CartItem, ShippingDetails } from 'src/interfaces';

export interface CartInterface {
  cartItems: CartItem[];
  shippingDetails: ShippingDetails;
}

export const defaultCart = {
  cartItems: [],
  shippingDetails: {
    address: '',
    postalCode: '',
  },

};

export class Cart {
  constructor(public cart: CartInterface = defaultCart) { }
}
