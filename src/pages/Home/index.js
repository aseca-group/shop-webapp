import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import { ShoppingBag } from "@mui/icons-material";
import { getProducts, sendOrder } from "../../requests";
import { useParams } from "react-router-dom";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([{ name: "Coca", price: 1000 }]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const customerId = useParams().customerId;
  const addressId = useParams().addressId;

  const handleAddToCart = (product) => {
    const newCart = [...cart];
    const itemIndex = newCart.findIndex((item) => item.name === product.name);

    if (itemIndex === -1) {
      newCart.push({ ...product, qty: 1 });
    } else {
      newCart[itemIndex].qty++;
    }

    setCart(newCart);
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();
      setProducts(response);
    }

    fetchData();
  }, []);

  const makeOrder = async () => {
    setIsLoading(true);
    const order = {
      productsId: [
        ...cart.map((product) => {
          return { productId: product.id, qty: product.qty };
        }),
      ],
      customerId: customerId,
      addressId: addressId,
    };
    console.log(order);
    try {
      const res = await sendOrder(order).then(() => {
        setIsLoading(false);
        setCart([]);
        console.log(res);
        setSuccess(true);
      });
    } catch (error) {
      setIsLoading(false);
      setError("An error occurred while making the purchase.");
    }
  };

  const totalProducts = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Box display={"flex"} justifyContent={"center"}>
        <Typography sx={{ fontSize: "40px", fontWeight: "bold" }}>
          Make your purchase!
        </Typography>
      </Box>
      <Box
        border={"1px solid"}
        borderRadius={"8px"}
        height={"100%"}
        width={"200vh"}
      >
        {products.map((product, index) => (
          <Product
            key={index}
            id={product.id}
            name={product.name}
            price={product.price}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Box>
      <Box marginTop={"10vh"}>
        <Badge badgeContent={totalProducts} color="primary">
          <ShoppingBag fontSize="large" />
        </Badge>
      </Box>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        {cart.map((product, index) => (
          <Box display={"flex"} alignItems={"center"} key={index}>
            <Typography fontSize={"20px"}>
              Nombre: {product.name} | Precio: ${product.price} | Cantidad:{" "}
              {product.qty}
            </Typography>
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "7vh", borderRadius: 3, width: "15vh" }}
        onClick={makeOrder}
        disabled={cart.length === 0}
      >
        {isLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          "Buy now!"
        )}
      </Button>
      {error && (
        <Typography fontSize={'20px'} color="error" marginTop={2}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography fontSize={'20px'} color="green" marginTop={2}>
          Purchase made successfully!
        </Typography>
      )}
    </Box>
  );
};

export default Home;
