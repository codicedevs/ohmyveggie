import { CategoryInterface } from "../../interfaces";
import { ActionTypes } from "./categories.action-types";

export type CategoriesAction =
  | FetchCategoriesStart
  | FetchCategoriesSuccess
  | FetchCategoriesError
  | CreateCategoryStart
  | CreateCategoryError
  | CreateCategorySuccess
  | UpdateCategoryStart
  | UpdateCategoryError
  | UpdateCategorySuccess
  | DeleteCategoryStart
  | DeleteCategoryError
  | DeleteCategorySuccess;

export interface FetchCategoriesStart {
  type: ActionTypes.FETCH_CATEGORIES_START;
}

export interface FetchCategoriesSuccess {
  type: ActionTypes.FETCH_CATEGORIES_SUCCESS;
  payload: CategoryInterface[];
}

export interface FetchCategoriesError {
  type: ActionTypes.FETCH_CATEGORIES_ERROR;
  payload: string;
}

export interface CreateCategoryStart {
  type: ActionTypes.CREATE_CATEGORY_START;
}

export interface CreateCategoryError {
  type: ActionTypes.CREATE_CATEGORY_ERROR;
  payload: string;
}

export interface CreateCategorySuccess {
  type: ActionTypes.CREATE_CATEGORY_SUCCESS;
  payload: CategoryInterface;
}

export interface UpdateCategoryStart {
  type: ActionTypes.UPDATE_CATEGORY_START;
}

export interface UpdateCategoryError {
  type: ActionTypes.UPDATE_CATEGORY_ERROR;
  payload: string;
}

export interface UpdateCategorySuccess {
  type: ActionTypes.UPDATE_CATEGORY_SUCCESS;
  payload: CategoryInterface;
}

export interface DeleteCategoryStart {
  type: ActionTypes.DELETE_CATEGORY_START;
}

export interface DeleteCategoryError {
  type: ActionTypes.DELETE_CATEGORY_ERROR;
  payload: string;
}

export interface DeleteCategorySuccess {
  type: ActionTypes.DELETE_CATEGORY_SUCCESS;
  payload: null;
}
