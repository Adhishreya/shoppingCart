import { Rating, styled } from "@mui/material";

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "0rem",
  gap: "0.5rem",
  [theme.breakpoints.down("md")]: {
    margin: "0rem 0.5rem 1rem",
    width: "100%",
  },
}));

const Title = styled("div")(({ theme }) => ({
  fontSize: "1.6rem",
  fontWeight: 700,
}));

const Body = styled("div")(({ theme }) => ({
  fontSize: "1.2rem",
  fontWeight: 500,
}));

const User = styled("div")(({ theme }) => ({
  fontSize: "1.4rem",
  fontWeight: 600,
}));

const Image = styled("img")(({ theme }) => ({
  width: "5rem",
  height: "5rem",
  //   borderRadius: "50%",
}));

const ReviewItems = ({ body, title, images, rating, username }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <User> ~ {username}</User>
      <Rating value={rating} readOnly precision={0.5} />
      {images?.length > 0 && <Image src={images[0]} />}
      <Body>{body}</Body>
    </Wrapper>
  );
};

export default ReviewItems;
