import { Dispatch } from "react";

export type TProduct = {
    id: number;
    title: string | null;
    price: number | null;
    description: string | null;
    category: string | null;
    image: string;
    rating: {
        rate: number | null;
        count: number | null;
    };
};

export type TCartProduct = TProduct & {
    amount: number;
};

export type TProductsContext = {
    fetchedProducts: Readonly<TProduct[]>,
    cartProducts: Readonly<TCartProduct[]>,
    // dispatch: () => void;
    dispatch: Dispatch<TProductsAction>; // užvedus ant dispatch in App.tsx
};

export type TProductsAction = {
    type: "addProduct" | "removeProduct" | "setProducts";
    payload: {
        productId?: number,
        fetchedProducts?: TProduct[],
    }
}
// ? added to productId, nes setProducts nereikės productId.

export type TProductsState = {
    fetchedProducts: Readonly<TProduct[]>,
    cartProducts: Readonly<TCartProduct[]>,
}