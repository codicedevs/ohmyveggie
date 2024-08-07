import { CategoriesState, CategoryState } from "./categories.state";

export const initialCategory = {
  _id: "",
  name: "",
};

export const categoryInitialState: CategoryState = {
  loading: false,
  error: null,
  data: initialCategory,
};
export const categoriesInitialState: CategoriesState = {
  loading: false,
  error: null,
  data: [],
};
