import { Badge, Box, Button, Drawer, Grid } from "@mui/material";
import { type FC, useState, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Cart } from "../Cart";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { ProductsContext } from "../ProductsContext";

export const Header: FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cartProducts } = useContext(ProductsContext);

  const totalAmount = cartProducts.reduce(
    (curAmount, cartProduct) => curAmount + (cartProduct.amount || 0),
    0
  );

  return (
    <Box component="header">
      <Grid container justifyContent="space-between" alignItems="center" p={2}>
        <Grid>
          <Link to="/">
            <img src={logo} alt="Logo" style={{ width: "8rem" }} />
          </Link>
        </Grid>

        <Grid>
          <Drawer
            anchor="right"
            open={cartOpen}
            onClose={() => setCartOpen(false)}
            PaperProps={{
              sx: { width: "60%" },
            }}
          >
            <Cart />
          </Drawer>

          <Button onClick={() => setCartOpen(true)}>
            <Badge badgeContent={totalAmount} color="error">
              <ShoppingCartOutlinedIcon
                sx={{ stroke: "#ffffff", strokeWidth: 1 }}
                fontSize="large"
              />
            </Badge>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
