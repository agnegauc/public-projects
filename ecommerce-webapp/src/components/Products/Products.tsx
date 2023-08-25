import { Box, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../ProductsContext";
import { Product } from "./Product";

export const Products = () => {
  const { dispatch, fetchedProducts } = useContext(ProductsContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) =>
        dispatch({
          type: "setProducts",
          payload: { fetchedProducts: res.data },
        })
      )
      .catch((error) => console.error(error))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: "max-content", mx: "auto", py: 10 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container gap={5} justifyContent="center" my="1rem">
          {fetchedProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </>
  );
};
