import {
  CategoryInterface,
  PaginatedProducts,
  ProductInterface,
} from "../../interfaces";

export interface ProductsState {
  loading: boolean;
  error: string | null;
  data: PaginatedProducts;
  categories: any[];
}

export interface ProductState {
  loading: boolean;
  error: [] | string | null;
  data: ProductInterface;
  success?: boolean;
}

export interface TopRatedProductsState {
  loading: boolean;
  error: string | null;
  data: ProductInterface[];
}
