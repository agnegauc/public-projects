import { AccountCircle } from "@mui/icons-material";
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import logo from "../../assets/logo.png";

export const Header = () => {
  const { authDispatch } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    authDispatch({
      type: "logout",
    });
    setAnchorEl(null);
    localStorage.removeItem("token");
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <AppBar position="static" color="inherit">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex">
          <MenuItem
            component={Link}
            to={"/events"}
            sx={{
              "& img": { height: "5vh", opacity: "80%" },
            }}
          >
            <img src={logo} alt="Logo" />
          </MenuItem>
          <MenuItem component={Link} to={"/events"}>
            Events
          </MenuItem>
          <MenuItem component={Link} to={"/participants"}>
            Participants
          </MenuItem>
          <MenuItem component={Link} to={"/add-participant"}>
            Add participant
          </MenuItem>
        </Box>

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogOut} sx={{ width: "30vh" }}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};
