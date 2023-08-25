import { createContext } from "react";
import type { TProductsContext } from "./types";

// didžiosiomis, nes tai yra constanta - kažkas, kas nesikeis
const INITIAL_VALUE = {
  fetchedProducts: [],
  cartProducts: [],
  dispatch: () => {},
} as const; // kad negalėtume redaguoti initial values. With this, Readonly should be added in types

export const ProductsContext = createContext<TProductsContext>(INITIAL_VALUE);
