import { useContext, useState } from "react";
import axios from "axios";
import type { TLoginInput } from "./types";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { AuthContext } from "../AuthContext";
import heroImage from "../../assets/picture.jpg";
import logo from "../../assets/logo.png";

export const Login = () => {
  const { authDispatch } = useContext(AuthContext);
  const [loginInput, setLoginInput] = useState<TLoginInput>({
    email: null,
    password: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    setLoginInput({ ...loginInput, [prop]: event?.target.value });
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8000/login", {
        email: loginInput.email,
        password: loginInput.password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        authDispatch({
          type: "login",
          payload: res.data.token,
        });
      })
      .then(() => {
        alert(`Log in successful`);

        navigate("/events");
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      overflow="hidden"
      wrap="nowrap"
    >
      <Grid
        container
        item
        direction="column"
        p="8vh"
        width="70vh"
        justifyContent="center"
      >
        <Grid
          height="11vh"
          mb="5vh"
          sx={{
            "& img": { height: "100%", opacity: "80%" },
          }}
        >
          <img src={logo} alt="Logo" />
        </Grid>
        <Typography color="#464c5e" mb="6vh" fontWeight="light">
          Log in to easily manage events in your venue. All VIP guests in one
          place, taken good care of.
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { mb: 4, width: "55vh" },
          }}
          display="flex"
          flexDirection="column"
          noValidate
          autoComplete="off"
          onSubmit={handleFormSubmit}
        >
          <TextField
            required
            variant="standard"
            label="Email"
            InputLabelProps={{
              style: { color: "#9e9e9e", fontWeight: "lighter" },
            }}
            InputProps={{ type: "email" }}
            onChange={(event) => handleInputChange(event, "email")}
          />
          <TextField
            required
            variant="standard"
            label="Password"
            InputLabelProps={{
              style: { color: "#9e9e9e", fontWeight: "lighter" },
            }}
            type="password"
            onChange={(event) => handleInputChange(event, "password")}
          />
          <Button
            variant="contained"
            size="small"
            type="submit"
            sx={{
              boxShadow: 1,
              borderRadius: 1,
              p: 1,
              mt: 4,
            }}
          >
            Log in
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        md={7}
        className="hero-photo"
        height="100vh"
        alignItems="center"
        sx={{
          "& img": { height: "100%" },
        }}
      >
        <img src={heroImage} alt="Crowd at a concert facing the stage" />
      </Grid>
    </Grid>
  );
};
