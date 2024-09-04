import { Rating, styled, TextField, alpha, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { basicProductDetails, submitReview } from "../requestModules/products";
import { Row } from "./Order";

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "2rem auto",
  width: "50%",
  gap: "3rem",
}));

const Upload = styled("button")(({ theme }) => ({
  border: "2px dotted",
  width: "6rem",
  height: "6rem",
  borderRadius: "0.2rem",
  position: "relative",
}));

const FileInput = styled("input")(({ theme }) => ({
  position: "absolute",
}));

const Image = styled("img")(({ theme }) => ({
  width: "8rem",
  height: "8rem",
  marginLeft: "0.3rem",
  backgroundColor: alpha(theme.palette.common.black, 0.5),
}));

const Review = () => {
  const [rating, setRating] = useState(0);
  const ratingRef = useRef();

  const [productDetails, setProductDetails] = useState();

  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const [para, setPara] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    let id = para.get("review-purchase");

    basicProductDetails(id, navigate).then((res) => {
      setProductDetails(res.data);
    });

    return () => {};
  }, [para]);

  const handleEvent = () =>{
    let id = para.get("review-purchase");
    submitReview(id,{title,body,rating},navigate)
  }

  return (
    <Wrapper>
      <h2>Create Review</h2>

      {productDetails && (
        <Row>
          <Image src={productDetails.images[0]} />
          <Link to={`/products/${para.get("review-purchase")}`}>
            <h3>{productDetails.productName}</h3>
          </Link>
        </Row>
      )}

      <hr />
      <Rating
        name="simple-controlled"
        size="large"
        // value={item.averageRating}
        // id={item._id}
        precision={0.5}
        ref={ratingRef}
        onChange={(event, newValue) => {
          setRating(newValue);
          //   modifyRating(navigate, item._id, rating);
        }}
      />
      <hr />
      <h2>Add a headline</h2>
      <TextField
        id="outlined-basic"
        name="title"
        // label="Outlined"
        placeholder="What's most important to know"
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
      />
      <h2>Add a photo or video</h2>
      <Upload>
        <h1>+</h1>
        <FileInput hidden accept="image/*" multiple type="file" />
      </Upload>
      <h2>Add a written review</h2>
      <TextField
        id="outlined-multiline-flexible"
        // label="Multiline"
        placeholder="What did you like or dislike?"
        multiline
        name="body"
        maxRows={8}
        onChange={(e) => setBody(e.target.value)}
        // value={value}
        // onChange={handleChange}
      />
      <Button onClick={() => handleEvent()}>Submit</Button>
    </Wrapper>
  );
};

export default Review;
