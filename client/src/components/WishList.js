import { Button, CircularProgress, Rating, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  getWishList,
  moveToCart,
  removeFromWishList,
} from "../requestModules/wishlist";
import { Loading } from "./DataFetch";
import { EmptyContainer } from "./Cart";
import { EMPTY_CONTAINER } from "../constants/dataUri";

const Wrapper = styled("div")(({ theme }) => ({
  margin: "1rem auto",
  width: "90%",
}));

const ImageWrapper = styled("img")(({ theme }) => ({
  maxWidth: "100%",
}));

const ListItem = styled("div")(({ theme }) => ({}));
const Box = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
}));
const Image = styled("img")(({ theme }) => ({
  width: "8rem",
  height: "8rem",
}));
const ItemDetails = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
}));
const Row = styled("div")(({ theme }) => ({
  display: "flex",
}));

const WishList = () => {
  const [data, setData] = useState();
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    getWishList()
      .then((res) => {
        if (mounted.current === true && res) setData(res);
      })
      .catch((e) => {
        if (mounted) setErr(e);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted.current = false;
    };
  }, []);

  if (loading)
    return (
      <Loading>
        <CircularProgress />
      </Loading>
    );

  return (
    <Wrapper>
      <>
        <EmptyContainer style={{ flexDirection: "column" }}>
          <ImageWrapper
            src={EMPTY_CONTAINER}
            alt="empty cart"
          />
          <h3>No wishlist</h3>
        </EmptyContainer>
      </>
      {data &&
        data.map((item, index) => (
          <ListItem key={item._id}>
            <Box>
              {item.product_id.images && (
                <Image src={item.product_id.images[0]} />
              )}
              <ItemDetails>
                <Link to={`/products/${item.product_id._id}`}>
                  <h2>{item.product_id.productName}</h2>
                </Link>
                <Rating
                  value={item.product_id.averageRating}
                  readOnly
                  precision={0.5}
                />
                <p>
                  {(item.product_id.price / 100) *
                    (1 - item.product_id.discount[0].value / 100)}
                </p>
                <Row>
                  <p>{item.product_id.price}</p>
                  <p>{item.product_id.discount[0].value}%</p>
                </Row>
              </ItemDetails>
              <ItemDetails>
                <Button onClick={() => moveToCart(item.product_id._id)}>
                  Move to Cart
                </Button>
                <Button onClick={() => removeFromWishList(item.product_id._id)}>
                  Remove from wishlist
                </Button>
              </ItemDetails>
            </Box>
          </ListItem>
        ))}
    </Wrapper>
  );
};

export default WishList;
