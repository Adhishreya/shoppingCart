import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { productDetails } from "../requestModules/products";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Button, CircularProgress, Rating } from "@mui/material";

import { styled, alpha } from "@mui/material/styles";

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

const ProductDetails = (props) => {
  const [data, setData] = useState(null);
  const [showDetails, setDetails] = useState(false);
  const [img, setImg] = useState(null);

  useEffect(() => {
    productDetails(param.id)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  }, []);
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
              <h2>{data.productName}</h2>
              <h4>
                Cost{" "}
                <strike>
                  <span>&#8377;{`${data.price / 100}`}</span>
                </strike>{" "}
                <span>
                  &#8377;
                  {(data.price / 100) * (1 - data.discount[0].value / 100)}
                </span>
              </h4>
              <p>
                {data.averageRating > 0 ? (
                  // `Rating : ${ data.averageRating}`
                  <Rating value={data.averageRating} readOnly />
                ) : (
                  "Rating is not available for this product"
                )}
              </p>
              <Button onClick={() => setDetails((showDetails) => !showDetails)}>
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
            </Detail>
          </FlexRow>

          {/* {
                        data.reviews.lenght > 0 ? <div className="flex-row">
                            {
                                data.reviews.map((item, index) => <div>
                                    <h6>{item.username}</h6>
                                    <p>{item.title}</p>
                                    <p>{item.body}</p>
                                </div>)
                            }
                        </div> : <p style={{margin: "6% 4%"}}>Reviews on this product is not yet available</p>
                    } */}
        </div>
      ) : (
        <Loading><CircularProgress /></Loading>
      )}
    </Container>
  );
};

export default ProductDetails;
