import { useEffect, useState, useMemo, useRef } from 'react';
import {
    Button, CardActions, Slider, Card,
    CardContent,
    CardMedia,
    Typography,
    Pagination,
    Stack,
    Alert
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { Link, useNavigate } from "react-router-dom";

import { styled, alpha } from '@mui/material/styles';

import {
    productDetails, increment, fetchAllProducts, tagsDetails, discountDetails, getCategories, getProductByCategory,
    getProductByTag,
    getProductByDiscount,
    filterProducts,
    getQuantity
} from '../requestModules/products';

const CardFooter = styled('div')(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    width: '100%',
    justifyContent: "space-between",
    justifySelf: "flex-center"
}))

const Filter = styled('div')(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "20%",
    cursor: "pointer",
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    padding: "0.5rem 1rem",
    margin: "0.2rem 0rem"
}));

const StackPagination = styled(Stack)(({ theme }) => ({
    margin:"auto",
    width:"fit-content",
    paddingBottom:"2rem"
}));

const Wrapper = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "2rem",
    [theme.breakpoints.down('md')]:{
        margin:"2rem 0.5rem"
    }
}));

const UnorderedList = styled('div')(({ theme }) => ({
    display:"flex",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems:"start",
    listStyle:"none",
    [theme.breakpoints.down('md')]: {
        width: '10%',
    }
}));

const ProductList  = styled('div')(({ theme }) => ({
    width: "80%",
    flex:2,
    [theme.breakpoints.down('md')]: {
        flex:0,
        width:"100%",
        margin:"2rem"
    }
}));

const ProductCard = styled(Card)(({ theme }) => ({
    width: '100%',
    height:"18rem", 
    padding: "0.5rem", 
    display: "flex",
     flexDirection: "column", 
     [theme.breakpoints.down('md')]:{
     }
}));

const ProductItem = styled('div')(({ theme }) => ({
    // flex:2,
    [theme.breakpoints.down('md')]: {
        // flex:1
    }
}));

const FilterOption = styled('div')(({ theme }) => ({
    width:"fit-contents"
}));

const FilterHeader = styled('h6')(({ theme }) => ({
}));

const Loading = styled('h1')(({ theme }) => ({
    width:"100%",
    textAlign:"center"
}));

const List = styled('div')(({ theme }) => ({
}));

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
    const [showDialog, setShowDialog] = useState(false);

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
                <UnorderedList>
                    {filters && Object.keys(filters).map((item, index) =>
                        <>
                            {
                                filters[item] &&
                                <Filter onClick={() => removeFilter(item)}>
                                    <List key={`${item}-${filters.item}`} >
                                        {filters[item].value}
                                    </List>
                                    <CloseIcon />
                                </Filter>
                            }
                        </>
                    )
                    }
                </UnorderedList>
            </div>
            <Wrapper>
                <UnorderedList >
                    <FilterOption>
                        <FilterHeader>Price Range</FilterHeader>
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
                    </FilterOption>
                    <FilterOption>
                        <FilterHeader>Discount</FilterHeader>
                        <UnorderedList>
                            {
                                discount.map(item => <li key={item.id}><label><input
                                    onChange={(e) => addFilter({ "discount": { value: `${e.target.value}%`, id: item._id } })} name="discount" type="radio" value={item.value} />{item.value}%,{item.name}</label></li>)
                            }
                        </UnorderedList>
                    </FilterOption>

                    <FilterOption>
                        <FilterHeader>Tags</FilterHeader>
                        <UnorderedList>
                            {
                                tags && tags.map(item => <li key={item.id}><label><input
                                    onChange={(e) => addFilter({ "tags": { value: e.target.value, id: item._id } })} name="tag" type="radio" value={item.tagNAme} />{item.tagNAme}</label></li>)
                            }
                        </UnorderedList>
                    </FilterOption>
                    <FilterOption>
                        <h6>Categories</h6>
                        <UnorderedList>
                            {
                                categories && categories.map(item => <li key={item.id}><label><input
                                    onChange={(e) => addFilter({ "category": { value: e.target.value, id: item._id } })} name="category" type="radio" value={item.categoryName} />{item.categoryName}</label></li>)
                            }
                        </UnorderedList>
                    </FilterOption>
                </UnorderedList>
                {products.length === 0 ? <Loading >Loading</Loading> :
                 <ProductList className="grid">
                    {
                        products.map(product => {return (
                                <ProductItem key={product._id}>
                                    <ProductCard style={{opacity: `${product.availability > 0 ? 1 : 0.5}` }}>
                                        <Link to={`${product.availability > 0 ? `/products/${product._id}` : ''}  `}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                width="30"
                                                image={product.images[0]}
                                                alt={product.name}
                                                onClick={() => productDetails(product._id)}
                                            />
                                        </Link>
                                        <CardContent>
                                            <Typography gutterBottom variant="body" component="div">
                                                {product.productName && product.productName.slice(0,10)}
                                            </Typography>
                                        </CardContent>
                                        
                                        <CardFooter>
                                            <Typography variant="subtitle1" color="text.primary">
                                                <b>{'\u20B9'}</b><strike>{(product.price) / 100}</strike>{ '  '}
                                                <span>&#8377;{((product.price) / 100) * (1 - (product.discount[0].value / 100))}</span>
                                            </Typography>
                                            <CardActions>
                                                {
                                                    product.availability > 0 ?
                                                        <Button onClick={() => {
                                                            if (localStorage.getItem("token") !== null) {
                                                                increment(product._id, navigate, setShowDialog).then(res => {
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
                                                    // getQuantity(product._id,navigate).then(res=>{})
                                                }
                                            </div>
                                        </CardFooter>
                                    </ProductCard>
                                </ProductItem>
                            )
                        }
                        )
                    }
                </ProductList>}
            </Wrapper>
            <StackPagination spacing={2}>
                <Pagination count={3} color="secondary" onChange={(event, value) => setPageNumber(value)} />
            </StackPagination>
            {showDialog && <Alert style={{ width: "20%" }} severity="success">Item added to Cart</Alert>}
        </>
    );
}
export default Products;