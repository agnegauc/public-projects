import { Grid, Typography } from "@mui/material";
import { ProductActionButton } from "../Products/ProductActionButton";

export const CartItem = ({ cartProduct }: any) => {
  const currencyFormat = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "EUR",
  });

  return (
    <Grid
      container
      sx={{ borderBottom: 1, py: 3, "&:last-child": { borderBottom: "0" } }}
    >
      <Grid item xs={8}>
        <Typography variant="h6">{cartProduct.title}</Typography>
        {cartProduct.price && (
          <Typography fontSize="12px" mt={1} color="#4d4e4f">
            UNIT PRICE: {currencyFormat.format(cartProduct.price)}
          </Typography>
        )}
        <Grid container gap={1} alignItems="center" sx={{ marginTop: 5 }}>
          <ProductActionButton
            title="-"
            type="removeProduct"
            productId={cartProduct.id}
          />
          <Typography>{cartProduct.amount}</Typography>
          <ProductActionButton
            title="+"
            type="addProduct"
            productId={cartProduct.id}
          />
        </Grid>
      </Grid>

      <Grid
        item
        xs={4}
        display="flex"
        alignItems="center"
        justifyContent="right"
      >
        <img
          src={cartProduct.image}
          style={{ width: 100 }}
          alt={cartProduct.title}
        />
      </Grid>
    </Grid>
  );
};
