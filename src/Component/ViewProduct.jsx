// src/components/ProductCard.js
import React, { useState, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Rating,
  Box,
} from "@mui/material";
import axios from 'axios';

import { useLocation,useNavigate } from 'react-router-dom';

const ViewProduct = () => {

  const location = useLocation();

  const navigate  = useNavigate();
  console.log(location.state);

  const [product, setproduct] = useState([]);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${location.state}`);


        setproduct([...product, response.data]); // Set the fetched data to state
        console.log(response.data);
      } catch (err) {
        alert("Error while fetching")// Handle any errors
      }
    };

    // Call the async function
    fetchProducts();
  }, []);


  return (

    <div style={{display: 'flex', justifyContent:'center'}}>
      {
        product.length === 0 ? (
          <div>No products found.</div>
        ) : (
          product?.map((product) => {
            return (
              <Card sx={{ maxWidth: 500, margin: 2, boxShadow: 4 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                  sx={{ objectFit: "contain", padding: 2 }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>

                  </Box>
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    ${product.price}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="contained" color="primary" fullWidth
                  onClick={()=>navigate('/')}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            )
          })
        )

      }
    </div>
  );
};

export default ViewProduct;
