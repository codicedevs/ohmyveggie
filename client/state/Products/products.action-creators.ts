import Router from "next/router";
import { Dispatch } from "redux";
import { CategoryInterface, ProductInterface, Review } from "../../interfaces";
import { proshopAPI } from "../../lib";
import { ActionTypes } from "./products.action-types";
import { ProductsAction } from "./products.actions";
import { Interface } from "readline";
import { toast } from "react-toastify";

interface FetchProductsParams {
  keyword?: query;
  pageId?: number;
  categories?: string;
  shouldScroll?: boolean;
}

export const fetchProducts =
  ({
    keyword = "",
    pageId = 1,
    categories = "",
    shouldScroll = false,
  }: FetchProductsParams) =>
  async (dispatch: Dispatch<ProductsAction>) => {
    try {
      dispatch({
        type: ActionTypes.FETCH_PRODUCTS_START,
      });

      const { data } = await proshopAPI.get(
        `/products?keyword=${keyword}&categories=${categories}&pageId=${pageId}`
      );
      setTimeout(() => {
        dispatch({
          type: ActionTypes.FETCH_PRODUCTS_SUCCESS,
          payload: data,
        });
        if (shouldScroll) {
          const element = document.getElementById("scrollUp");
          element?.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_PRODUCTS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const fetchTopRatedProducts =
  () => async (dispatch: Dispatch<ProductsAction>) => {
    try {
      dispatch({
        type: ActionTypes.FETCH_TOP_PRODUCTS_START,
      });

      const { data } = await proshopAPI.get("/products/topRated");

      dispatch({
        type: ActionTypes.FETCH_TOP_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_TOP_PRODUCTS_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const fetchProduct =
  (id: string) => async (dispatch: Dispatch<ProductsAction>) => {
    try {
      dispatch({
        type: ActionTypes.FETCH_PRODUCT_START,
      });

      const { data } = await proshopAPI.get(`/products/${id}`);

      dispatch({
        type: ActionTypes.FETCH_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_PRODUCT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const fetchProductReset =
  () => async (dispatch: Dispatch<ProductsAction>) => {
    dispatch({
      type: ActionTypes.FETCH_PRODUCT_RESET,
    });
  };

export const deleteProduct =
  (id: string) => async (dispatch: Dispatch<ProductsAction>) => {
    const config = {
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.DELETE_PRODUCT_START,
      });

      await proshopAPI.delete(`/products/${id}`, config);

      dispatch({
        type: ActionTypes.DELETE_PRODUCT_SUCCESS,
        payload: null,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.DELETE_PRODUCT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const createProduct =
  (productDetails) => async (dispatch: Dispatch<ProductsAction>) => {
    const config = {
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.CREATE_PRODUCT_START,
      });
      const { data } = await proshopAPI.post(
        `/products`,
        productDetails,
        config
      );
      dispatch({
        type: ActionTypes.CREATE_PRODUCT_SUCCESS,
        payload: data,
      });

      Router.push(`/admin/products/`);
    } catch (error: any) {
      dispatch({
        type: ActionTypes.CREATE_PRODUCT_ERROR,
        payload: error.response.data.message,
      });
      console.log(error.response.data.message);
    }
  };

export const updateProduct =
  (id: string, product: any, pageId?: any) =>
  async (dispatch: Dispatch<ProductsAction>) => {
    const config = {
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.UPDATE_PRODUCT_START,
      });
      const { data } = await proshopAPI.put(`/products/${id}`, product, config);

      dispatch({
        type: ActionTypes.UPDATE_PRODUCT_SUCCESS,
        payload: data,
      });

      if (pageId) {
        fetchProducts(pageId);
      }

      dispatch({
        type: ActionTypes.UPDATE_PRODUCT_RESET,
      });

      Router.push("/admin/products");
    } catch (error: any) {
      dispatch({
        type: ActionTypes.UPDATE_PRODUCT_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const createProductReview =
  (id: string, review: Review) =>
  async (dispatch: Dispatch<ProductsAction>) => {
    const config = {
      withCredentials: true,
    };

    try {
      dispatch({
        type: ActionTypes.CREATE_PRODUCT_REVIEW_START,
      });

      const { data } = await proshopAPI.put(
        `/products/${id}/review`,
        review,
        config
      );

      dispatch({
        type: ActionTypes.CREATE_PRODUCT_REVIEW_SUCCESS,
        payload: data,
      });

      dispatch({
        type: ActionTypes.CREATE_PRODUCT_REVIEW_RESET,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.CREATE_PRODUCT_REVIEW_ERROR,
        payload: error.response.data.message,
      });
    }
  };
