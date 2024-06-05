import { CartInterface } from '../interfaces';

export const cartWithPrices = (cart: CartInterface) => {
  const itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc: number, item: any) => acc + item.price * item.qty,
      0
    )
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(parseFloat((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = addDecimals(itemsPrice);

  return {
    ...cart,
    shippingPrice,
    taxPrice,
    itemsPrice,
    totalPrice,
  };
};

export const addDecimals = (n: number) => {
  return parseFloat((Math.round(n * 100) / 100).toFixed(2));
};

export const validatePhone = (n: number) => {

  const regex = /^(\+54|54)?\s*(\(?\d{2,4}\)?)\s*\d{6,8}$/;
  const numero = n.toString()
  
  return regex.test(numero);
  
}

export * from './config';
export * from './env';
