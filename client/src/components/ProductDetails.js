import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  addToWishList,
  checkWishList,
  removeFromWishList,
} from "../requestModules/wishlist";

import { productDetails } from "../requestModules/products";

import { increment } from "../requestModules/cart";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
  Button,
  CircularProgress,
  MenuItem,
  Rating,
  Select,
  TextField,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { styled, alpha } from "@mui/material/styles";
import { Row } from "./Orders";

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "25rem",
  justifyContent: "space-between",
  padding: "0rem",
  marginTop: "1rem",
  border: "2px solid",
  marginLeft: "1rem",
  gap: "0.5rem",
  [theme.breakpoints.down("md")]: {
    margin: "2rem 0.5rem",
    width: "100%",
  },
}));

const Loading = styled("h1")(({ theme }) => ({
  width: "100%",
  textAlign: "center",
}));

const FlexRow = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-evenly",
  gap: "2rem",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

const GridDisplay = styled("div")(({ theme }) => ({
  listStyle: "none",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gridGap: "2.5rem",
  margin: "1rem 1rem 1rem 1rem",
  padding: 0,
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

const Avatar = styled("img")(({ theme }) => ({
  width: "5rem",
  height: "5rem",
  borderRadius: "50%",
}));

const Detail = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
}));

const CustomImageList = styled(ImageList)(({ theme }) => ({
  width: "100%",
  height: "12rem",
}));

const Container = styled("div")(({ theme }) => ({
  margin: "2rem",
}));

const Price = styled("div")(({ theme }) => ({
  fontSize: "1.6rem",
}));

const Name = styled("div")(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 600,
}));

const ProductDetails = (props) => {
  const [data, setData] = useState(null);
  const [showDetails, setDetails] = useState(false);
  const [img, setImg] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [isWishListPresent, setIsWishListPresent] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    productDetails(param.id)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));

    checkWishList(param.id).then((res) => {
      if (res.data) setIsWishListPresent(true);
    });
  }, []);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  let param = useParams();
  return (
    <Container>
      {data ? (
        <div>
          <FlexRow>
            <Wrapper
              className={`${
                data.images && data.images.length > 0 ? "multiImage" : ""
              }`}
            >
              <img
                alt="main-image"
                src={img ? img : data.images[0]}
                className={`${
                  data.images > 0 ? "productImages-img" : "fit-entireSpace"
                }`}
              />
              <GridDisplay
                className={`${data.images.length > 0 && "hide-element"} `}
              >
                {data.images.length > 0 ? (
                  <CustomImageList cols={3} rowHeight={164}>
                    {data.images.map((item, index) => (
                      <ImageListItem key={index}>
                        <img
                          src={`${item}`}
                          srcSet={`${item}?w=100&h=100&fit=crop&auto=format&dpr=2 2x`}
                          alt={item}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            cursor: "pointer",
                          }}
                          onMouseOver={() => setImg(item)}
                        />
                      </ImageListItem>
                    ))}
                  </CustomImageList>
                ) : null}
              </GridDisplay>
            </Wrapper>
            <Detail>
              <Name>{data.productName}</Name>
              <Price>
                <strike>
                  <span>&#8377;{`${data.price / 100}`}</span>
                </strike>{" "}
                <span>
                  &#8377;
                  {(data.price / 100) * (1 - data.discount[0].value / 100)}
                </span>
              </Price>
              <p>
                {data.averageRating > 0 ? (
                  // `Rating : ${ data.averageRating}`
                  <Rating value={data.averageRating} readOnly precision={0.5} />
                ) : (
                  "Rating is not available for this product"
                )}
              </p>
              <Button
                onClick={() => setDetails((showDetails) => !showDetails)}
                style={{ paddingLeft: "0rem" }}
              >
                {showDetails ? "Hide Details " : "View Vendor details"}
              </Button>
              {showDetails && data.vendorDetails ? (
                <div>
                  {data.vendorDetails.map((item, index) => (
                    <div key={index}>
                      <p>{item.companyAddress}</p>
                      <a href={`mailto:${item.companyEmail}`}>
                        <p>{item.companyEmail}</p>
                      </a>
                      <p>{item.companyName}</p>
                      <a href={item.companyWebsite}>
                        <p>{item.companyWebsite}</p>
                      </a>
                      <p>{item.companyPhone}</p>
                    </div>
                  ))}
                </div>
              ) : null}
              <p style={{ display: "flex", width: "76%" }}>
                {data.description ? data.description : null}
              </p>
              <Row style={{ margin: "2rem 0rem" }}>
                {/* <TextField
                  style={{ width: "4rem" }}
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                /> */}

                {/* <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                {!!data.availability && (
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    style={{
                      width: "4rem",
                      // opacity: `${data.availability > 0 ? 1 : 0.5}`,
                    }}
                    value={quantity}
                    label="Age"
                    onChange={handleChange}
                  >
                    {Array.from(
                      { length: data.availability + 1 },
                      (v, i) => i
                    ).map((i, v) => (
                      <MenuItem key={v} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                {/* </FormControl> */}
                {data.availability > 0 && (
                  <Button
                    variant="contained"
                    // disabled={data.availability > 0 ? true : false}
                    style={{
                      opacity: `${data.availability > 0 ? 1 : 0.5}`,
                      cursor: `${
                        data.availability > 0 ? "pointer" : "not-allowed"
                      }`,
                    }}
                    onClick={() => increment(data._id, navigate, quantity)}
                  >
                    Add to cart
                  </Button>
                )}
              </Row>
              {!isWishListPresent ? (
                <Button
                  variant="contained"
                  onClick={() => {
                    addToWishList(data._id, navigate);
                  }}
                >
                  Add to wishlist
                  <BookmarkBorderIcon />
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => removeFromWishList(data._id, navigate)}
                >
                  Remove from Wishlist
                  <BookmarkIcon />
                </Button>
              )}
            </Detail>
          </FlexRow>

          {data.reviews && data.reviews.length > 0 ? (
            <div className="flex-row">
              <h1>Reviews</h1>
              {data.reviews.map((item, index) => (
                <div key={item._id}>
                  <h5>{item.userId.username}</h5>
                  {item.userId.displayPicture && (
                    <Avatar src={item.userId.displayPicture} />
                  )}
                  {/* <h6>{item.username}</h6> */}
                  <p>{item.title}</p>
                  <Rating value={item.rating} readOnly precision={0.5} />
                  <p>{item.body}</p>
                  <hr />
                </div>
              ))}
            </div>
          ) : (
            <p style={{ margin: "4%", paddingBottom: "2rem" }}>
              Reviews on this product is not yet available
            </p>
          )}
          {/* {<h1>Reviews</h1>} */}
        </div>
      ) : (
        <Loading>
          <CircularProgress />
        </Loading>
      )}
    </Container>
  );
};

export default ProductDetails;
