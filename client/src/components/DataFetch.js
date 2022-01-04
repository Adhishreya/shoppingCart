import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

const Products = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(res => {
                setProducts(res.data);
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            <ul class="grid">
                {products.map(product => (
                    <li key={product.id}>
                        <Card sx={{ maxWidth: 355 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.images[0]}
                                    alt={product.name}
                                />
                                <CardContent>

                                    <div class="grid">
                                        <Typography gutterBottom variant="body" component="div">
                                            {product.productName}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.primary">
                                            {product.price}
                                        </Typography>

                                    </div>
                                    <Button variant="contained" startIcon={<AddShoppingCartIcon />}>
                                        ADD TO CART
                                    </Button>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                {/* <Button size="small" color="primary">
          Share
        </Button> */}
                            </CardActions>
                        </Card>
                    </li>
                ))}

            </ul>
        </div>
    );
}
export default Products;