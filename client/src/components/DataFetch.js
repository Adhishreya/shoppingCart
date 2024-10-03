import { useEffect, useState, useMemo, useRef } from "react";
import {
  Button,
  CardActions,
  Slider,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  Stack,
  Alert,
  CircularProgress,
  ImageListItem,
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { Link, useNavigate } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";

import {
  productDetails,
  fetchAllProducts,
  tagsDetails,
  discountDetails,
  getCategories,
  useFilterFetch,
  useFeatureFetch,
} from "../requestModules/products";

import { increment } from "../requestModules/cart";

import { PAGE_COUNT } from "../constants/constant";
import { useResponsive } from "../utilities/breakpoints";
import { useQueryClient } from "react-query";

const CardFooter = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  justifySelf: "flex-center",
}));

export const ColumnContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Filter = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "10%",
  cursor: "pointer",
  backgroundColor: alpha(theme.palette.common.black, 0.25),
  padding: "0.5rem 1rem",
  margin: "1rem 1rem 0rem 0rem",
}));

const StackPagination = styled(Stack)(({ theme }) => ({
  margin: "auto",
  width: "fit-content",
  paddingBottom: "2rem",
}));

const Wrapper = styled("div")(({ theme, isEmpty }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: isEmpty ? "space-between" : "space-evenly",
  margin: "2rem",
  [theme.breakpoints.down("md")]: {
    margin: "2rem 0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const UnorderedList = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "start",
  listStyle: "none",
  [theme.breakpoints.down("md")]: {
    width: "10%",
  },
  [theme.breakpoints.down("md")]: {},
}));

const ProductList = styled("div")(({ theme }) => ({
  width: "80%",
  flex: 2,
  [theme.breakpoints.down("md")]: {
    flex: 0,
    width: "calc(100% - 4rem)",
    margin: "2rem",
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  width: "calc(100% - 1.6rem)",
  height: "18rem",
  padding: "0.5rem",
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.down("sm")]: {
    width: "calc(100% - 0.8rem)",
  },
}));

const ProductItem = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {},
}));

const FilterOption = styled("div")(({ theme }) => ({
  width: "fit-content",
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
}));

const FilterHeader = styled("h6")(({ theme }) => ({}));

export const Loading = styled("h1")(({ theme }) => ({
  width: "100%",
  textAlign: "center",
}));

const List = styled("div")(({ theme }) => ({}));

const Image = styled("img")(({ theme }) => ({ margin: "auto" }));

const OuterUnorderedList = styled(UnorderedList)(({ theme }) => ({
  width: "15%",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    top: "4rem",
    zIndex: "464",
    background: "white",
    position: "fixed",
    height: "100vh",
  },
}));

const CloseWrapper = styled(UnorderedList)(({ theme }) => ({
  position: "fixed",
  top: "4rem",
  right: "0.5rem",
  zIndex: 900,
  cursor: "pointer",
}));

const UnorderedInlineList = styled(UnorderedList)(({ theme }) => ({
  flexDirection: "row",
  marginLeft: "0.3rem",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginLeft: "0rem",
  },
}));

const Products = (props) => {
  let navigate = useNavigate();
  const queryClient = useQueryClient();

  const [products, setProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilter] = useState({
    tags: null,
    discount: null,
    categories: null,
  });
  const [categories, setCategories] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [value, setValue] = useState([100, 200000]);
  const [value1, setValue1] = useState(1000);
  const [value2, setValue2] = useState(9999);
  const [showDialog, setShowDialog] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  let minDistance = 100;

  const lowerValueRef = useRef();
  const upperValueRef = useRef();

  // useEffect(() => {
  //   fetchAllProducts(pageNumber)
  //     .then((res) => {
  //       setProducts(res);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const resetFilters = () => {
    setFilter({
      tags: null,
      discount: null,
      categories: null,
    });
    setValue([100, 200000]);
  };
  const { data, isLoading, isError, refetch } = useFeatureFetch(pageNumber);

  const isMobile = useResponsive(window.innerWidth);

  const [showFilters, setShowFilter] = useState(!isMobile);

  useEffect(() => {
    setTotalPages(data?.data?.total);
    setProducts(data?.data?.products);
  }, [data]);

  useEffect(() => {
    if (typeof props.search != undefined && props.search !== null) {
      searchFilter(props.search);
    }
  }, [props.search]);

  useEffect(() => {
    tagsDetails()
      .then((res) => {
        setTags(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    discountDetails()
      .then((res) => {
        setDiscount(res);
      })
      .catch((err) => console.log(err));
  }, []);

  function addFilter(value) {
    setFilter(Object.assign({}, filters, value));
  }

  const [url, setUrl] = useState("?");

  const {
    data: filterData,
    isLoading: filterLoading,
    isFetching,
    refetch: filterRefetch,
  } = useFilterFetch(url);

  useEffect(() => {
    if (filterData && !filterLoading && !isFetching) {
      setProducts(filterData?.products);
      setTotalPages(filterData?.total);
    }
  }, [filterData, filterLoading, isFetching]);

  useEffect(() => {
    let url = "?";
    if (filters.tags != null) {
      url += `tags=${filters.tags.id}&`;
    }
    if (filters.discount != null) {
      url += `discount=${filters.discount.id}&`;
    }
    if (filters.category != null) {
      url += `category=${filters.category.id}&`;
    }
    url += `lower=${value[0]}&upper=${value[1]}&pageNumber=${pageNumber}`;

    if (url !== "?") {
      setUrl(url);
      filterRefetch();
    }
  }, [filters, value, pageNumber]);

  function removeFilter(data) {
    setFilter(Object.assign({}, filters, { [data]: null }));
  }

  // function fetchProducts() {
  //   fetchAllProducts().then((res) => {
  //     setProducts(res?.products);
  //     setTotalPages(res?.total);
  //   });
  // }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function searchFilter(value) {
    if (!value.length) filterRefetch();
    let serachedResults = products?.filter((items) =>
      items.productName?.toLowerCase()?.includes(value.toLowerCase())
    );
    if (serachedResults.length) setProducts(serachedResults);
  }

  useEffect(() => {
    handleChange(null, [value1, value[1]]);
  }, [value1]);

  useEffect(() => {
    return () => handleChange(null, [value[0], value2]);
  }, [value2]);

  useEffect(() => {
    if (showFilters) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [showFilters]);

  return (
    <>
      <UnorderedInlineList>
        {filters &&
          Object.keys(filters).map((item, index) => (
            <>
              {filters[item] && (
                <Filter onClick={() => removeFilter(item)}>
                  <List key={`${item}-${filters.item}`}>
                    {filters[item].value}
                  </List>
                  <CloseIcon />
                </Filter>
              )}
            </>
          ))}
      </UnorderedInlineList>
      <Wrapper isEmpty={products?.length === 0 && !isLoading}>
        {products?.length > 0 && (
          <>
            {isMobile && (
              <Button onClick={() => setShowFilter(true)}>Apply Filters</Button>
            )}
            {isMobile && showFilters && (
              <CloseWrapper
                onClick={() => setShowFilter(false)}
                className="close-wrapper"
              >
                <CloseIcon />
              </CloseWrapper>
            )}
            {showFilters && (
              <OuterUnorderedList>
                <FilterOption>
                  <FilterHeader>Price Range</FilterHeader>
                  <Slider
                    getAriaLabel={() => "Minimum distance"}
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
                    {discount.map((item) => (
                      <li key={item.id}>
                        <label>
                          <input
                            onChange={(e) => {
                              const discount = `${e.target.value}%`;
                              navigate(`/?discount=${discount}`);
                              addFilter({
                                discount: {
                                  value: `${e.target.value}%`,
                                  id: item._id,
                                },
                              });
                            }}
                            name="discount"
                            type="radio"
                            value={item.value}
                            checked={
                              item.value ===
                              Number(
                                filters.discount?.value?.split("%")[0] || 0
                              )
                            }
                          />
                          {item.value}%,{item.name}
                        </label>
                      </li>
                    ))}
                  </UnorderedList>
                </FilterOption>

                <FilterOption>
                  <FilterHeader>Tags</FilterHeader>
                  <UnorderedList>
                    {tags &&
                      tags.map((item) => (
                        <li key={item.id}>
                          <label>
                            <input
                              onChange={(e) =>
                                addFilter({
                                  tags: { value: e.target.value, id: item._id },
                                })
                              }
                              name="tag"
                              type="radio"
                              value={item.tagNAme}
                              checked={item.tagNAme === filters.tags?.value}
                            />

                            {item.tagNAme}
                          </label>
                        </li>
                      ))}
                  </UnorderedList>
                </FilterOption>
                <FilterOption>
                  <h6>Categories</h6>
                  <UnorderedList>
                    {categories &&
                      categories.map((item) => (
                        <li key={item.id}>
                          <label>
                            <input
                              onChange={(e) =>
                                addFilter({
                                  category: {
                                    value: e.target.value,
                                    id: item._id,
                                  },
                                })
                              }
                              name="category"
                              type="radio"
                              value={item.categoryName}
                              checked={
                                item.categoryName === filters?.category?.value
                              }
                            />
                            {item.categoryName}
                          </label>
                        </li>
                      ))}
                  </UnorderedList>
                </FilterOption>
              </OuterUnorderedList>
            )}
          </>
        )}
        {isLoading || filterLoading ? (
          <Loading>
            <CircularProgress />
          </Loading>
        ) : products?.length === 0 ? (
          <>
            <ColumnContainer style={{ width: "100%" }}>
              <Image
                // component="img"
                height="auto"
                width="50%"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRdkL889A0WSFsDhxsVsZo0QPOZoQPrq1q8Q&s"
                alt="No Products found"
                // onClick={() => productDetails(product._id)}
              />
              <div style={{ width: "fit-content" }}>
                <Button variant="outlined" size="medium" onClick={resetFilters}>
                  Clear Filters
                </Button>
              </div>
            </ColumnContainer>
          </>
        ) : (
          <>
            {products && (
              <ProductList className="grid">
                {products?.map((product) => {
                  return (
                    <ProductItem key={product._id}>
                      <ProductCard
                        style={{
                          opacity: `${product.availability > 0 ? 1 : 0.5}`,
                        }}
                      >
                        <Link
                          to={`${
                            product.availability > 0
                              ? `/products/${product._id}`
                              : ""
                          }  `}
                        >
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
                          <Typography
                            gutterBottom
                            variant="body"
                            component="div"
                          >
                            {product.productName &&
                              product.productName.slice(0, 10)}
                          </Typography>
                        </CardContent>

                        <CardFooter>
                          <Typography variant="subtitle1" color="text.primary">
                            <b>{"\u20B9"}</b>
                            <strike>{product.price / 100}</strike>
                            {"  "}
                            <span>
                              &#8377;
                              {(product.price / 100) *
                                (1 - product.discount[0].value / 100)}
                            </span>
                          </Typography>
                          <CardActions>
                            {product.availability > 0 ? (
                              <Button
                                onClick={() => {
                                  if (localStorage.getItem("token") !== null) {
                                    increment(
                                      product._id,
                                      navigate,
                                      1,
                                      queryClient
                                    ).then((res) => {
                                      props.value.add();
                                    });
                                  }
                                }}
                                variant="contained"
                                startIcon={<AddShoppingCartIcon />}
                              ></Button>
                            ) : (
                              <Alert severity="info">Not Available</Alert>
                            )}
                          </CardActions>
                          <div>
                            {
                              // getQuantity(product._id,navigate).then(res=>{})
                            }
                          </div>
                        </CardFooter>
                      </ProductCard>
                    </ProductItem>
                  );
                })}
              </ProductList>
            )}
          </>
        )}
      </Wrapper>
      {!isLoading && products?.length !== 0 && totalPages / PAGE_COUNT > 1 && (
        <StackPagination spacing={2}>
          <Pagination
            count={totalPages / PAGE_COUNT}
            color="secondary"
            onChange={(event, value) => setPageNumber(value)}
          />
        </StackPagination>
      )}
      {showDialog && (
        <Alert style={{ width: "20%" }} severity="success">
          Item added to Cart
        </Alert>
      )}
    </>
  );
};
export default Products;
