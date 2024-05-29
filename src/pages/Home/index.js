import { Badge, Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Product from "../../components/Product";
import { ShoppingBag } from "@mui/icons-material";
import { getProducts, sendOrder } from "../../requests";
import { useParams } from "react-router-dom";

const Home = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
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
    const res = await sendOrder(order);
    console.log(res);
    setCart([]);
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
            <Typography fontSize={'20px'}>
              Nombre: {product.name} | Precio: ${product.price} | Cantidad:{" "}
              {product.qty}
            </Typography>
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: "7vh", borderRadius: 3 }}
        onClick={makeOrder}
        disabled={cart.length === 0}
      >
        Buy now!
      </Button>
    </Box>
  );
};

export default Home;
