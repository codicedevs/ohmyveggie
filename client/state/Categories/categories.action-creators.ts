import { Dispatch } from "react";
import { CategoryInterface } from "../../interfaces";
import { CategoriesAction } from "./categories.actions";
import { ActionTypes } from "./categories.action-types";
import { proshopAPI } from "../../lib";

export const fetchCategories =
  () => async (dispatch: Dispatch<CategoriesAction>) => {
    try {
      dispatch({
        type: ActionTypes.FETCH_CATEGORIES_START,
      });
      const { data } = await proshopAPI.get("/categories");
      dispatch({
        type: ActionTypes.FETCH_CATEGORIES_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.FETCH_CATEGORIES_ERROR,
        payload: error.response?.data.message,
      });
    }
  };

export const createCategory =
  (categoryDetails: CategoryInterface) =>
  async (dispatch: Dispatch<CategoriesAction>) => {
    try {
      dispatch({
        type: ActionTypes.CREATE_CATEGORY_START,
      });

      const { data } = await proshopAPI.post<CategoryInterface>(
        `/categories`,
        categoryDetails
      );

      dispatch({
        type: ActionTypes.CREATE_CATEGORY_SUCCESS,
        payload: data,
      });

      return data;
    } catch (error: any) {
      dispatch({
        type: ActionTypes.CREATE_CATEGORY_ERROR,
        payload: error.response.data.message,
      });
      console.log(error.response.data.message);
    }
  };

export const updateCategory =
  (categoryDetails: CategoryInterface) =>
  async (dispatch: Dispatch<CategoriesAction>) => {
    try {
      dispatch({ type: ActionTypes.UPDATE_CATEGORY_START });
      const { data } = await proshopAPI.patch(
        `/categories/${categoryDetails._id}`,
        categoryDetails
      );
      dispatch({ type: ActionTypes.UPDATE_CATEGORY_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.UPDATE_CATEGORY_ERROR,
        payload: error.response.data.message,
      });
      console.log(error.response.data.message);
    }
  };

export const deleteCategory =
  (id: string) => async (dispatch: Dispatch<CategoriesAction>) => {
    try {
      dispatch({ type: ActionTypes.DELETE_CATEGORY_START });
      const { data } = await proshopAPI.delete(`/categories/${id}`);
      dispatch({ type: ActionTypes.DELETE_CATEGORY_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: ActionTypes.DELETE_CATEGORY_ERROR,
        payload: error.response.data.message,
      });
      console.log(error.response.data.message);
    }
  };
