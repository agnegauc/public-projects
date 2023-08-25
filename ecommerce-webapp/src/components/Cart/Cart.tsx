import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { ProductsContext } from "../ProductsContext";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const { cartProducts } = useContext(ProductsContext);

  const currencyFormat = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "EUR",
  });
  const totalPrice = cartProducts.reduce(
    (curPrice, cartProduct) =>
      curPrice + (cartProduct.price || 0) * cartProduct.amount,
    0
  );

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 4 }}>
        <Typography>YOUR CART</Typography>
        {cartProducts.length === 0 ? (
          <Typography py={4}>
            You haven't added any items to your cart yet!
          </Typography>
        ) : null}
        {cartProducts.map((cartProduct) => (
          <CartItem key={cartProduct.id} cartProduct={cartProduct} />
        ))}
      </Box>

      <Box sx={{ p: 4, bgcolor: "#F9f9f9" }}>
        <Typography textAlign="right">
          TOTAL:&nbsp;{currencyFormat.format(totalPrice)}
        </Typography>
      </Box>
    </Box>
  );
};
