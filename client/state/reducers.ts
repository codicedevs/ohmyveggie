import { combineReducers } from "redux";
import { cartReducer } from "./Cart/cart.reducers";
import {
  orderReducer,
  ordersReducer,
  userOrdersReducer,
} from "./Order/order.reducers";
import {
  productCreateReducer,
  productCreateReviewReducer,
  productDeleteReducer,
  productEditReducer,
  productReducer,
  productsReducer,
  productsTopRatedReducer,
} from "./Products/products.reducers";
import {
  userDetailsReducer,
  userEditReducer,
  userLoginReducer,
  userRecoverPassword,
  userRegisterReducer,
  usersReducer,
  userUpdateReducer,
} from "./User/user.reducers";

import { uIReducer } from "./UI/ui.reducers";

export const reducers = combineReducers({
  products: productsReducer,
  productsTopRated: productsTopRatedReducer,
  product: productReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productCreateReview: productCreateReviewReducer,
  cart: cartReducer,
  user: userDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  userEdit: userEditReducer,
  order: orderReducer,
  orders: ordersReducer,
  userOrders: userOrdersReducer,
  users: usersReducer,
  uI: uIReducer,
  userRecoverPass: userRecoverPassword,
});

export type RootState = ReturnType<typeof reducers>;
