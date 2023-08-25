import { Button } from "@mui/material";
import { type FC, useContext } from "react";
import { ProductsContext } from "../ProductsContext";
import type { TProductActionButtonProps } from "./types";

// We're doing composition:
export const ProductActionButton: FC<TProductActionButtonProps> = ({
  title,
  type,
  productId,
}) => {
  const { dispatch } = useContext(ProductsContext);

  return (
    <Button
      size="small"
      sx={{ minWidth: "30px" }}
      onClick={() =>
        dispatch({
          type,
          payload: { productId },
        })
      }
    >
      {title}
    </Button>
  );
};
