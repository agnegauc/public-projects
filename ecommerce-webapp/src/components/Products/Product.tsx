import { Grid, Typography } from "@mui/material";
import { type FC, useContext } from "react";
import { ProductsContext } from "../ProductsContext";
import { ProductActionButton } from "./ProductActionButton";
import type { TProductProps } from "./types";

// export const Product = ({ product }: TProductProps) => {
export const Product: FC<TProductProps> = ({ product }) => {
  const { cartProducts } = useContext(ProductsContext);

  // Some looks if there's at least one and returns true/false. Find returns the first matching value itself
  // it would've been better to use object rather than just cartProduct => cartProduct.id === product.id due to O(n^2) (so that it doesn't look further once the first correct answer is found)

  const cartProduct = cartProducts.find(
    (cartProduct) => cartProduct.id === product.id
  );
  const productAmountInCart = cartProduct ? cartProduct.amount : 0;
  const isProductInCart = productAmountInCart > 0;
  const currencyFormat = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "EUR",
  });

  return (
    <Grid
      container
      flexDirection="column"
      xs={6}
      sm={2.5}
      padding={2}
      boxShadow="0px 0px 3px 1px rgba(0, 0, 0, 0.1)"
    >
      <Grid
        margin="0 auto"
        width="150px"
        height="300px"
        alignItems="center"
        container
        sx={{
          "& img": { objectFit: "cover", width: "100%", maxHeight: "100%" },
        }}
      >
        <img src={product.image} alt={product.title ?? "Product image"} />
      </Grid>

      <Grid sx={{ marginBottom: "2rem" }}>
        <Typography>{product.title}</Typography>
        <Typography fontSize="0.7rem" marginTop="0.5rem" color="gray">
          {product.description}
        </Typography>
      </Grid>

      <Grid sx={{ marginTop: "auto" }}>
        <Typography>
          {product.price !== null
            ? currencyFormat.format(product.price)
            : "N/A"}
        </Typography>
        {isProductInCart ? (
          <Grid display="flex" gap={1} alignItems="center">
            <ProductActionButton
              title="-"
              type="removeProduct"
              productId={product.id}
            />

            <Typography>{productAmountInCart}</Typography>

            <ProductActionButton
              title="+"
              type="addProduct"
              productId={product.id}
            />
          </Grid>
        ) : (
          <ProductActionButton
            title="ADD TO CART"
            type="addProduct"
            productId={product.id}
          />
        )}
      </Grid>
    </Grid>
  );
};
