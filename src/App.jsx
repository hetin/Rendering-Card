import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, CardActions, Button, CardMedia, Paper } from '@mui/material';
import { blue, green } from '@mui/material/colors';

const App = () => {
  const [productData, setProductData] = useState([]);
  const [cart, setCart] = useState([]);
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProductData(response.data);
      })
      .catch(err => console.log(err));
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const toggleShowMore = (productId) => {
    setShowMore(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {productData.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <Card sx={{ minHeight: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {product.title}
                </Typography>
                <Typography color="textSecondary">
                  Price: ${product.price}
                </Typography>
                <Typography color="textSecondary">
                  Category: {product.category}
                </Typography>
                <Typography color="textSecondary">
                  Description: {showMore[product.id] ? product.description : product.description.substring(0, 100)}
                </Typography>
                {product.description.length > 100 && (
                  <Button
                    onClick={() => toggleShowMore(product.id)}
                  >
                    {showMore[product.id] ? 'See Less' : 'See More'}
                  </Button>
                )}
                <Typography color="textSecondary">
                  Rating: {product.rating.rate} ({product.rating.count} reviews)
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => addToCart(product)}
                  sx={{ backgroundColor: green[500], color: 'white' }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ padding: 2, mt: 4 }}>
        <Typography variant="h4" component="div">
          Cart
        </Typography>
        {cart.map((item, index) => (
          <Card key={index} sx={{ margin: '1rem' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {item.title}
              </Typography>
              <Typography color="textSecondary">
                Price: ${item.price}
              </Typography>
              <Typography color="textSecondary">
                Category: {item.category}
              </Typography>
              <Typography color="textSecondary">
                Description: {item.description}
              </Typography>
              <Typography color="textSecondary">
                Rating: {item.rating.rate} ({item.rating.count} reviews)
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Paper>
    </Container>
  );
}

export default App;
