import { CategoryInterface } from "../../interfaces";

export interface CategoryState {
  loading: boolean;
  error: [] | string | null;
  data: CategoryInterface;
  success?: boolean;
}

export interface CategoriesState {
  loading: boolean;
  error: string | null;
  data: CategoryInterface[];
  success?: boolean;
}
