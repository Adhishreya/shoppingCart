import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

const Products = (props) => {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(res => {
                setProducts(res.data);
                // console.log(res.data)
            })
            .catch(err => console.log(err));
    }, []);
    return (
        <div>
            <ul className="grid">
                {products.map(product => (
                    <li key={product._id}>
                        <Card sx={{ maxWidth: 355 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={product.images[0]}
                                    alt={product.name}
                                />
                                <CardContent>

                                    <div className="grid">
                                        <Typography gutterBottom variant="body" component="div">
                                            {product.productName}
                                        </Typography>
                                        <Typography variant="subtitle1" color="text.primary">
                                            {product.price}
                                        </Typography>

                                    </div>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button onClick={() => {
                                    props.value.add(); console.log(props.value.itemCount)
                                }} variant="contained" startIcon={<AddShoppingCartIcon />}>
                                    ADD TO CART
                                </Button>
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