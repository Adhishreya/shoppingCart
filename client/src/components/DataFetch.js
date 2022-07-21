import { useEffect, useState, useMemo, useRef } from 'react';
import {
    Button, CardActionArea, CardActions, Slider, TextField, Card,
    CardContent,
    CardMedia,
    Typography,
    Pagination,
    Stack,
    IconButton,
    Alert
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { height } from '@mui/system';
import { connect } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";


import {
    productDetails, increment, fetchAllProducts, tagsDetails, discountDetails, getCategories, getProductByCategory,
    getProductByTag,
    getProductByDiscount,
    filterProducts,
    getQuantity
} from '../requestModules/products';

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
    const [filters, setFilter] = useState({ tags: null, discount: null });
    const [categories, setCategories] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [value, setValue] = useState([100, 200000]);
    const [value1, setValue1] = useState(1000);
    const [value2, setValue2] = useState(9999);
    const[showDialog,setShowDialog] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);

    let minDistance = 100;

    const lowerValueRef = useRef();
    const upperValueRef = useRef();



    useEffect(() => {
        fetchAllProducts(pageNumber)
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


    function addFilter(value) {

        setFilter(Object.assign({}, filters, value));
    }

    useEffect(() => {

        let url = '?';
        if (filters.tags != null) {
            url += `tags=${filters.tags.id}&`
        }
        if (filters.discount != null) {
            url += `discount=${filters.discount.id}&`
        }
        if (filters.category != null) {
            url += `category=${filters.category.id}&`
        }
        url += `lower=${value[0]}&upper=${value[1]}&pageNumber=${pageNumber}`;

        console.log(url);
        if (url !== '?') {
            filterProducts(url)
                .then(res => {
                    setProducts(res);
                }).catch(err => console.log(err))
        }
    }, [filters, value, pageNumber])


    function removeFilter(data) {
        setFilter(Object.assign({}, filters, { [data]: null }));
    }

    function fetchProducts() {
        fetchAllProducts().then(res => {
            setProducts(res);
        })
    }

    useEffect(() => {
        // lowerValueRef.current.value = value[0];
        // upperValueRef.current.value = value[1];
        // console.log(lowerValueRef.current.value, upperValueRef.current.value);
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
                        return (<li key={`${item}-${filters.item}`} onClick={() => removeFilter(item)}>
                            {filters[item] ? filters[item].value : ''}

                        </li>)

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
                    </div>
                    <div>
                        <h6>Discount</h6>
                        <ul>
                            {
                                discount.map(item => <li key={item.id}><label><input
                                    onChange={(e) => addFilter({ "discount": { value: `${e.target.value}%`, id: item._id } })} name="discount" type="radio" value={item.value} />{item.value}%,{item.name}</label></li>)
                            }
                        </ul>
                    </div>

                    <div>
                        <h6>Tags</h6>
                        <ul>
                            {
                                tags && tags.map(item => <li key={item.id}><label><input
                                    onChange={(e) => addFilter({ "tags": { value: e.target.value, id: item._id } })} name="tag" type="radio" value={item.tagNAme} />{item.tagNAme}</label></li>)
                            }
                        </ul>
                    </div>
                    <div>
                        <h6>Categories</h6>
                        <ul>
                            {
                                categories && categories.map(item => <li key={item.id}><label><input
                                    onChange={(e) => addFilter({ "category": { value: e.target.value, id: item._id } })} name="category" type="radio" value={item.categoryName} />{item.categoryName}</label></li>)
                            }
                        </ul>
                    </div>
                </ul>
                {products.length === 0 ? <h6>Could not fetch the products</h6> : <ul className="grid" style={{ width: "80%" }}>
                    {
                        products.map(product => {
                            // console.log(typeof product._id!=="undefined")
                            //    typeof product!=="undefined" && getQuantity(product._id, navigate).then(data => {})
                            return (
                                <li key={product._id}>
                                    <Card style={{ width: '100%', padding: "0.5rem", display: "flex", flexDirection: "column", opacity: `${product.availability > 0 ? 1 : 0.5}` }}>
                                        <Link to={`${product.availability > 0 ? `/products/${product._id}` : ''}  `}>
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
                                                <b>{'\u20B9'}</b><strike>{(product.price) / 100}</strike>
                                                <span>&#8377;{((product.price) / 100) * (1 - (product.discount[0].value / 100))}</span>
                                            </Typography>
                                            <CardActions>
                                                {
                                                    product.availability > 0 ?
                                                        <Button onClick={() => {
                                                            if (localStorage.getItem("token") !== null) {
                                                                increment(product._id, navigate,setShowDialog).then(res => {
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
                                            <div>

                                                {
                                                    // getQuantity(product._id,navigate).then(res=>console.log(res))
                                                }
                                            </div>
                                        </div>
                                    </Card>
                                </li>
                            )
                        }
                        )
                    }
                </ul>}
            </div>
            <Stack spacing={2}>
                <Pagination count={3} color="secondary" onChange={(event, value) => setPageNumber(value)} />
            </Stack>
            {showDialog && <Alert style={{ width: "20%" }} severity="success">Item added to Cart</Alert>}
        </>
    );
}
export default Products;