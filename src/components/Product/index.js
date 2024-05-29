import { AddCircleOutline } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";

const Product = ({ id, name, price, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart({ id, name, price });
  };

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography sx={{ fontSize: "20px", padding: 2 }}>{name}</Typography>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
          width={"50vh"}
        >
          <Divider orientation="vertical" flexItem />
          <Typography sx={{ fontSize: "20px" }}>Precio: ${price}</Typography>
          <Divider orientation="vertical" flexItem />
          <IconButton aria-label="add to cart" onClick={handleAddToCart}>
            <AddCircleOutline fontSize="large" />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </Box>
  );
};

export default Product;
