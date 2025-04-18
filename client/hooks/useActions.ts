import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import {
  CartActionCreators,
  CategoriesActionCreators,
  OrderActionCreators,
  ProductsActionCreators,
  UIActionCreators,
  UserActionCreators,
} from "../state";

export const useCategoriesActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(CategoriesActionCreators, dispatch);
  }, [dispatch]);
};

export const useProductsActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(ProductsActionCreators, dispatch);
  }, [dispatch]);
};

export const useCartActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(CartActionCreators, dispatch);
  }, [dispatch]);
};

export const useUIActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return bindActionCreators(UIActionCreators, dispatch);
  }, [dispatch]);
};

export const useUserActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(UserActionCreators, dispatch);
  }, [dispatch]);
};

export const useOrderActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(OrderActionCreators, dispatch);
  }, [dispatch]);
};
