import type { TProduct, TProductsAction } from "../ProductsContext/types";

export type TProductProps = {
  product: TProduct;
};

export type TProductActionButtonProps = {
  productId: number;
  type: TProductsAction["type"]; // TProductsAction is an object and has not only type, but also payload. We're choosing only the "type" here
  title: string;
};
