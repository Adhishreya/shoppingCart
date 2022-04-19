import axios from 'axios';
import { useEffect, useState, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import { height } from '@mui/system';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { productDetails, increment, fetchAllProducts, tagsDetails, discountDetails } from '../requestModules/products';

import { useNavigate } from 'react-router-dom';


const styleComponent = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: '80%!important',
    justifyContent: "space-around",
    justifySelf: "flex-center",
}


const Products = (props) => {
    let navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [tags, setTags] = useState([]);
    const [filters, setFilter] = useState([]);
    const [discount, setDiscount] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => console.log(err));
    }, [tags]);
    useEffect(() => {
        if (typeof props.search != undefined && props.search !== null) {

                searchFilter(props.search)
        }
    }, [props.search]);

    useEffect(() => {
        axios.get('http://localhost:5000/tags')
            .then(res => {
                setTags(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {

        // discountDetails()
        //     .then(res => {
        //         setDiscount(res.data);
        //     })
        //     .catch(err => console.log(err));
        axios.get('http://localhost:5000/discount')
            .then(res => {
                setDiscount(res.data);
            })
            .catch(err => console.log(err));
    }, []);


    function tagFilter(value) {
        // let tagFilter = products.filter(item=>item.tags.includes(value));
        // setProducts(tagFilter);
        setFilter([...filters, value])
    }

    function applyAll() {

    }

    function tagRemoveFilter(value) {
        // let filteredProducts = products.filter(item=>item.name!==value);
        let remainingFilters = tags.filter(item => item !== value);
        setTags(remainingFilters);

    }

    function fetchProducts() {
        fetchAllProducts().then(res => {
            setProducts(res);
        })
    }

    function searchFilter(value) {
        if (!value.length) return fetchProducts();
        let serachedResults = products.filter(items => items.productName.toLowerCase().includes(value.toLowerCase()));
        if (serachedResults.length)
            setProducts(serachedResults);
    }

    return (
        <>
            <div>
                <ul>
                    {filters.map((item, index) => <li key={`${item}-${index}`} onClick={() => tagRemoveFilter(item)}>{item}</li>)}
                </ul>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "2rem" }}>
                <ul style={{ width: "20%" }}>
                    <div>
                        <h6>Price Range</h6>
                        <ul >
                            <li><label><input name="price" type="radio" value={1000} />Under 1000</label></li>
                            <li><label><input name="price" type="radio" value={10000} />₹10,000 - ₹10,000</label></li>
                            <li><label><input name="price" type="radio" value={15000} />₹15,000 - ₹20,000</label></li>
                            <li><label><input name="price" type="radio" value={20000} />₹20,000 - ₹30,000</label></li>
                            <li><label><input name="price" type="radio" value={30000} />Over ₹30,000</label></li>
                        </ul>
                    </div>
                    <div>
                        <h6>Discount</h6>
                        <ul>
                            {
                                discount.map(item => <li key={item.id}><label><input
                                    onChange={(e) => tagFilter(e.target.value)} name="tag" type="radio" value={item.value} />{item.value}%</label></li>)
                            }
                        </ul>
                    </div>

                    <div>
                        <h6>Tags</h6>
                        <ul>
                            {
                                tags.map(item => <li key={item.id}><label><input
                                    onChange={(e) => tagFilter(e.target.value)} name="tag" type="radio" value={item.name} />{item.name}</label></li>)
                            }
                        </ul>
                    </div>
                </ul>
                <ul className="grid" style={{ width: "80%" }}>
                    {//product.availability > 0
                        products.map(product => (
                            <li key={product._id}>
                                <Card style={{ width: '100%', padding: "0.5rem", display: "flex", flexDirection: "column" }}>
                                    <Link to={`/products/${product._id}`}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            width="30"
                                            image={product.images[0]}
                                            alt={product.name}
                                            onClick={() => productDetails(product._id)}
                                        // allowAdd={(product.availability > 0) ? true : false}
                                        />
                                    </Link>
                                    <CardContent>
                                        <Typography gutterBottom variant="body" component="div">
                                            {product.productName.slice(0, 10)}
                                        </Typography>
                                    </CardContent>
                                    {/* </CardActionArea> */}
                                    <div style={styleComponent}>
                                        <Typography variant="subtitle1" color="text.primary">
                                            <b>{'\u20B9'}</b>{product.price}
                                        </Typography>
                                        <CardActions>
                                            {
                                                product.availability > 0 ?
                                                    <Button onClick={() => {
                                                        if (localStorage.getItem("token") !== null) {
                                                            increment(product._id, navigate).then(res => {
                                                                props.value.add()
                                                            })
                                                        }
                                                    }
                                                    }
                                                        variant="contained" startIcon={<AddShoppingCartIcon />}>
                                                    </Button>
                                                    :
                                                    <Alert severity="info">Not Available</Alert>

                                            }
                                        </CardActions>
                                    </div>
                                </Card>
                            </li>
                        )
                        )
                    }
                </ul>
            </div>
        </>
    );
}
export default Products;