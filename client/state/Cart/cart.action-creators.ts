import { Dispatch } from 'redux';
import {
  ProductInterface,
  ShippingDetails,
} from '../../interfaces';
import { proshopAPI } from '../../lib';
import { ActionTypes } from './cart.action-types';
import { CartAction } from './cart.actions';
import { cartWithPrices } from '../../utils';
import Router from 'next/router';
import { toast } from 'react-toastify';
import { ActionTypes as AT } from '../Products/products.action-types';

interface AddToCart {
  qty: number;
  productId?: string;
  product?: ProductInterface;
}

export const addToCart =
  ({ qty, productId, product }: AddToCart) =>
  async (dispatch: Dispatch<any>) => {
    try {
      if (product) {
        dispatch({
          type: ActionTypes.ADD_CART_ITEM_START,
        });
      }
      
      const { data } = await proshopAPI.post(
        '/cart',
        {
          product,
          qty,
          productId,
        },
        { withCredentials: true }
      );
      dispatch({
        type: ActionTypes.ADD_CART_ITEM_SUCCESS,
        payload: data,
      });

      // toast.info("Producto agregado al carrito", {theme: "light"})
      
    } catch (error: any) {
      dispatch({
        type: ActionTypes.ADD_CART_ITEM_ERROR,
        payload: error.message,
      });
    }
  };

export const deleteAllCart = () => async (dispatch: Dispatch<CartAction>) => {
  
  await proshopAPI.delete('cart', {withCredentials: true})
    dispatch({type: ActionTypes.REMOVE_ALL_CART})
}

export const removeFromCart =
  (id: string) => async (dispatch: Dispatch<CartAction>) => {
    await proshopAPI.delete(`/cart/${id}`, { withCredentials: true });

    dispatch({
      type: ActionTypes.REMOVE_CART_ITEM,
      payload: id,
    });
    try {
    } catch (error: any) {
    }
  };

export const saveShippingAddress =
  (shippingDetails: ShippingDetails) =>
  async (dispatch: Dispatch<CartAction>) => {
    try {
 
      const { data } = await proshopAPI.post(
        '/cart/shipping',
        shippingDetails,
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: ActionTypes.SAVE_CART_SHIPPING_ADDRESS,
        payload: data,
      });



      Router.push('/placeorder');
    } catch (error: any) {
  
    }
  };

export const getCart = () => async (dispatch: Dispatch<CartAction>) => {
  try {
    dispatch({
      type: ActionTypes.GET_CART_START,
    });

    const { data } = await proshopAPI.get('/cart', { withCredentials: true });

    dispatch({
      type: ActionTypes.GET_CART_SUCCESS,
      payload: data,
    });

    const newCart = cartWithPrices(data);

    dispatch({
      type: ActionTypes.CALCULATE_PRICES,
      payload: newCart,
    });
  } catch (error: any) {
  
    dispatch({
      type: ActionTypes.GET_CART_ERROR,
      payload: error.response?.data.message,
    });
  }
};

export const savePaymentMethod =

  (paymentMethod: string) => async (dispatch: Dispatch<CartAction>) => {
    try {
      const { data } = await proshopAPI.post(
        '/cart/payment',
        { paymentMethod },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: ActionTypes.SAVE_CART_PAYMENT_METHOD,
        payload: data,
      });

      Router.push('/placeorder');
    } catch (error: any) {
    }
  };
