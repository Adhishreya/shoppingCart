import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import { height } from '@mui/system';

import {productDetails} from '../requestModules/products';


const styleComponent = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: '80%!important',
    justifyContent: "space-around",
    // background: "red",
    justifySelf: "flex-center",
}


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
                        <Card style={{ width: '100%' ,display:"flex",flexDirection:"column"}}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={product.images[0]}
                                alt={product.name}
                                onClick={() => productDetails(product._id)}
                            />
                            <CardContent>

                                <Typography gutterBottom variant="body" component="div">
                                    {product.productName}
                                </Typography>


                            </CardContent>
                            {/* </CardActionArea> */}
                            <div style={ styleComponent }>
                            <Typography variant="subtitle1" color="text.primary">
                                        <b>{'\u20B9'}</b>{product.price}
                                    </Typography>
                            <CardActions>
                               
                                    
                                    <Button onClick={() => {
                                        props.value.add(); console.log(props.value.itemCount)
                                    }} variant="contained" startIcon={<AddShoppingCartIcon />}>
                                        {/* ADD TO CART */}
                                    </Button>
                                
                            </CardActions>
                            </div>
                        </Card>
                    </li>
                ))}

            </ul>
        </div>
    );
}
export default Products;