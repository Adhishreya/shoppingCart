import { Rating, styled, TextField, alpha, Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { submitReview } from "../requestModules/review";
import { basicProductDetails } from "../requestModules/products";
import { Row } from "./Orders";
import CloseIcon from "@mui/icons-material/Close";

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  margin: "0rem auto 2rem",
  width: "50%",
  gap: "1rem",
  [theme.breakpoints.down("md")]: {
    width: "calc(100% - 4rem)",
    margin: "0rem 2rem 2rem",
    paddingBottom: "0.8rem",
  },
}));

const Heading = styled("div")(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 500,
}));

const PageHeading = styled("div")(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: 700,
  [theme.breakpoints.down("md")]: {
    marginTop: "0.8rem",
  },
}));

const Upload = styled("button")(({ theme }) => ({
  border: "2px dotted",
  width: "6rem",
  height: "6rem",
  borderRadius: "0.2rem",
  position: "relative",
  background: `${theme.palette.common.white}`,
  cursor: "pointer",
}));

const FileInput = styled("input")(({ theme }) => ({
  position: "absolute",
  background: "red",
}));

const Image = styled("img")(({ theme }) => ({
  width: "8rem",
  height: "8rem",
  marginLeft: "0.3rem",
  backgroundColor: alpha(theme.palette.common.black, 0.5),
}));

const ImageUploadWrapper = styled("div")(({ theme }) => ({
  width: "8rem",
  height: "8rem",
  position: "relative",
}));

const ImageWrapper = styled("div")(({ theme }) => ({
  maxWidth: "4rem",
  maxHeight: "4rem",
  position: "relative",
}));

const CloseWrapper = styled("div")(({ theme }) => ({
  width: "0.5rem",
  height: "0.5rem",
  position: "absolute",
  right: "0.8rem",
  top: "0.4rem",
}));

const ButtonWrapper = styled("div")(({ theme }) => ({
  width: "5rem",
  display: "flex",
  height: "6rem",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const Review = () => {
  const [rating, setRating] = useState(0);
  const ratingRef = useRef();
  const [uploadFile, setUploadFile] = useState(null);

  const [productDetails, setProductDetails] = useState();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [para, setPara] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    let id = para.get("review-purchase");

    basicProductDetails(id, navigate).then((res) => {
      setProductDetails(res.data);
    });

    return () => {};
  }, [para]);

  const imageToBeUploaded = useRef(null);

  const handleEvent = () => {
    let id = para.get("review-purchase");
    let imageDetails = null;
    if (uploadFile) {
      imageDetails = imageToBeUploaded.current;
    }
    submitReview(id, { title, body, rating }, navigate, imageDetails);
  };

  const isEnabled = () => title !== "" && body !== "";

  return (
    <Wrapper>
      <PageHeading>Add Review</PageHeading>

      {productDetails && (
        <Row>
          <Image src={productDetails.images[0]} />
          <Link to={`/products/${para.get("review-purchase")}`}>
            <h3>{productDetails.productName}</h3>
          </Link>
        </Row>
      )}
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
      <Heading>Add a headline</Heading>
      <TextField
        id="outlined-basic"
        name="title"
        // label="Outlined"
        placeholder="What's most important to know"
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Heading>Add a photo or video</Heading>
      {uploadFile ? (
        <ImageUploadWrapper>
          <CloseWrapper
            onClick={() => setUploadFile(null)}
            className="close-wrapper"
          >
            <CloseIcon width="0.5rem" fontSize="small" />
          </CloseWrapper>
          <ImageWrapper>
            <Image src={uploadFile} height="100%" width="100%" />
          </ImageWrapper>
        </ImageUploadWrapper>
      ) : (
        <Upload>
          <label htmlFor="contained-button-file">
            <ButtonWrapper>+</ButtonWrapper>
          </label>
          <FileInput
            hidden
            accept="image/*"
            multiple
            type="file"
            id="contained-button-file"
            onChange={(e) => {
              // setUploadFile(e.target.files[0]);
              const readFile = e.target.files[0];
              const reader = new FileReader();
              // reader.readAsDataURL(readFile);

              // reader?.onload((e) => {
              // setUploadFile(URL.createObjectURL(readFile));
              // });

              if (readFile) {
                const reader = new FileReader();
                reader.onload = function (e) {
                  setUploadFile(e.target.result);
                };
                reader.readAsDataURL(readFile);
              }
              const data = new FormData();

              data.append("image", readFile, "" + readFile.name + "");
              imageToBeUploaded.current = readFile;
            }}
            encType="multipart/form-data"
            name="image"
          />
        </Upload>
      )}
      <Heading>Add a written review</Heading>
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
      <Button
        onClick={() => handleEvent()}
        variant="contained"
        disabled={!isEnabled()}
      >
        Submit
      </Button>
    </Wrapper>
  );
};

export default Review;
