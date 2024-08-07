import { ActionTypes } from "./categories.action-types";
import { CategoriesAction } from "./categories.actions";
import {
  categoriesInitialState,
  categoryInitialState,
} from "./categories.initial-state";
import { CategoriesState, CategoryState } from "./categories.state";

export const categoryReducer = (
  state: CategoryState = categoryInitialState,
  action: CategoriesAction
): CategoryState => {
  switch (action.type) {
    case ActionTypes.CREATE_CATEGORY_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.CREATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    case ActionTypes.CREATE_CATEGORY_ERROR:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
export const categoriesReducer = (
  state: CategoriesState = categoriesInitialState,
  action: CategoriesAction
): CategoriesState => {
  switch (action.type) {
    case ActionTypes.FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    default:
      return state;
  }
};
