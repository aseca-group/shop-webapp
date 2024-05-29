import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdress, createCustomer } from "../../requests";

const Login = () => {
  const [customerName, setCustomerName] = useState("");
  const [city, setCity] = useState("");
  const [road, setRoad] = useState("");
  const [number, setNumber] = useState("");

  const handleCustomerInputChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handleCityInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleRoadInputChange = (e) => {
    setRoad(e.target.value);
  };

  const handleNumberInputChange = (e) => {
    setNumber(e.target.value);
  };

  const nav = useNavigate();

  const handleLogin = async () => {
    const customer = {
      name: customerName,
    };
    const adress = {
      city: city,
      road: road,
      number: number,
    };
    const customerId = await createCustomer(customer);
    const addressId = await createAdress(adress);
    nav("/home/" + customerId + "/" + addressId);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignContent={"center"}
      alignItems={"center"}
      sx={{ marginTop: "20vh" }}
    >
      <Typography>Customer:</Typography>
      <TextField
        label="enter name"
        onChange={handleCustomerInputChange}
      />
      <Typography marginTop={3}>Adress:</Typography>
      <TextField label="enter city" onChange={handleCityInputChange} />
      <TextField
        label="enter road"
        sx={{ marginTop: 1 }}
        onChange={handleRoadInputChange}
      />
      <TextField
        label="enter number"
        sx={{ marginTop: 1 }}
        onChange={handleNumberInputChange}
      />
      <Button
        variant="contained"
        color="success"
        sx={{ width: "20vh", marginTop: "5vh", borderRadius: "20px" }}
        onClick={handleLogin}
        disabled={customerName === "" || city === "" || road === "" || number === ""}
      >
        Entrar
      </Button>
    </Box>
  );
};

export default Login;
