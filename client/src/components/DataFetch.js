import { useEffect, useState, useMemo, useRef } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Slider, TextField } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import { height } from '@mui/system';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import {
    productDetails, increment, fetchAllProducts, tagsDetails, discountDetails, getCategories, getProductByCategory,
    getProductByTag,
    getProductByDiscount
} from '../requestModules/products';

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
    const [filters, setFilter] = useState({ tags: null, discount: null, lower: null, upper: null });
    const [categories, setCategories] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [value, setValue] = useState([100, 100000]);
    const [value1, setValue1] = useState(1000);
    const [value2, setValue2] = useState(9999);

    let minDistance = 100;

    const lowerValueRef = useRef();
    const upperValueRef = useRef();



    useEffect(() => {
        fetchAllProducts()
            .then(res => {
                setProducts(res);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (typeof props.search != undefined && props.search !== null) {

            searchFilter(props.search)
        }
    }, [props.search]);

    useEffect(() => {
        tagsDetails()
            .then(res => {
                setTags(res);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        getCategories().then(res => {
            setCategories(res)
        }).catch(err => console.log(err))
    }, [])

    useEffect(() => {
        discountDetails()
            .then(res => {
                setDiscount(res);
            })
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        // console.log(filters)
        applyAll();
    }, [filters]);

    const addCategory = (category) => {
        // console.log(category)
    }

    function addFilter(value) {
        setFilter(Object.assign({}, filters, value));
    }

    function applyAll() {
        const filteredProducts = products.filter((item) => {
            if (filters.price != null) {
                var priceRange = filters.price.split('-');
                if (priceRange.length === 1 && (parseFloat(item.price) <= parseFloat(priceRange[0]) || parseFloat(item.price) >= parseFloat(priceRange[0]))) {
                    console.log(item.price + '  ' + parseFloat(priceRange[0]))
                    console.log(parseFloat(item.price) <= parseFloat(priceRange[0]))
                    return true;
                } else (priceRange.length === 2 && parseFloat(priceRange[0]) <= parseFloat(item.price) && parseFloat(item.price) <= parseFloat(priceRange[1]))
                {
                    return true;
                }
            }
            else if (filters.tags != null && item.tags.length && item.tags.includes(filters.tags))
                return true
            else if (filters.discount != null && item.discount > 0 && item.discount == parseInt(filters.discount.split('%')[0])
            )
                return true
            else
                return false;
        });
        if (filteredProducts.length) {
            setProducts(filteredProducts)
        }
        else
            // 
            setProducts([]);
        if (filters.discount === null && filters.price === null && filters.tags === null)
            fetchProducts();

    }

    function removeFilter(data) {
        console.log({ [data]: null });
        // console.log( {value.valueOf():null})
        // let filteredProducts = products.filter(item=>item.name!==value);
        // let remainingFilters = tags.filter(item => item !== value);
        setFilter(Object.assign({}, filters, { [data]: null }));

    }

    function fetchProducts() {
        fetchAllProducts().then(res => {
            setProducts(res);
        })
    }

    useEffect(() => {
        lowerValueRef.current.value = value[0];
        upperValueRef.current.value = value[1];
        console.log(lowerValueRef.current.value, upperValueRef.current.value);
    }, [value])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function searchFilter(value) {
        if (!value.length) return fetchProducts();
        let serachedResults = products.filter(items => items.productName.toLowerCase().includes(value.toLowerCase()));
        if (serachedResults.length)
            setProducts(serachedResults);
    }

    useEffect(() => {
        // return () => 
        handleChange(null, [value1, value[1]])
    }, [value1])

    useEffect(() => {
        return () => handleChange(null, [value[0], value2])
    }, [value2])

    return (
        <>
            <div>
                <ul>
                    {filters && Object.keys(filters).map((item, index) => {
                        return (<li key={`${item}-${filters.item}`} onClick={() => removeFilter(item)}>{filters[item]}</li>)

                    })}
                </ul>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", margin: "2rem" }}>
                <ul style={{ width: "20%" }}>
                    <div>
                        <h6>Price Range</h6>
                        <Slider
                            getAriaLabel={() => 'Minimum distance'}
                            value={value}
                            onChange={handleChange}
                            valueLabelDisplay="auto"
                            // getAriaValueText={valuetext}
                            disableSwap
                            min={0}
                            step={1500}
                            max={100000}
                        />
                        <div className='flex' style={styleComponent}>
                            <TextField id="standard-basic" name="value1" label="lower value" value={value1}
                                className='width-sm' ref={lowerValueRef} onChange={(e) => setValue1(e.target.value)} />
                            <TextField id="standard-basic" name="value2" label="upper value"
                                className='width-sm' ref={upperValueRef} onChange={(e) => setValue2(e.target.value)} />
                        </div>

                        {/* <ul >
                            <li><label><input name="price" onChange={e => addFilter({ "price": `${e.target.value}` })} type="radio" value={1000} />Under 1000</label></li>
                            <li><label><input name="price" onChange={e => addFilter({ "price": `1000-${e.target.value}` })} type="radio" value={10000} />₹1,000 - ₹10,000</label></li>
                            <li><label><input name="price" onChange={e => addFilter({ "price": `10000-${e.target.value}` })} type="radio" value={15000} />₹15,000 - ₹20,000</label></li>
                            <li><label><input name="price" onChange={e => addFilter({ "price": `15000-${e.target.value}` })} type="radio" value={20000} />₹20,000 - ₹30,000</label></li>
                            <li><label><input name="price" onChange={e => addFilter({ "price": `20000-${e.target.value}` })} type="radio" value={30000} />Over ₹30,000</label></li>
                        </ul> */}
                    </div>
                    <div>
                        <h6>Discount</h6>
                        <ul>
                            {
                                discount.map(item => <li key={item.id}><label><input
                                    onChange={(e) => addFilter({ "discount": `${e.target.value}%` })} name="discount" type="radio" value={item.value} />{item.value}%,{item.name}</label></li>)
                            }
                        </ul>
                    </div>

                    <div>
                        <h6>Tags</h6>
                        <ul>
                            {
                                tags && tags.map(item => <li key={item.id}><label><input
                                    onChange={(e) => addFilter({ "tags": e.target.value })} name="tag" type="radio" value={item.tagNAme} />{item.tagNAme}</label></li>)
                            }
                        </ul>
                    </div>
                    <div>
                        <h6>Categories</h6>
                        <ul>
                            {
                                categories && categories.map(item => <li key={item.id}><label><input
                                    onChange={(e) => addCategory({ "category": e.target.value })} name="category" type="radio" value={item.categoryName} />{item.categoryName}</label></li>)
                            }
                        </ul>
                    </div>
                </ul>
                {products.length === 0 ? <h6>Could not fetch the products</h6> : <ul className="grid" style={{ width: "80%" }}>
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
                                            {/* {product.productName.slice(0, 10)} */}
                                            {product.productName}
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
                </ul>}
            </div>
        </>
    );
}
export default Products;