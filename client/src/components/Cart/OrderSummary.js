import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const Heading = styled("div")(({ theme }) => ({
  fontSize: "1.8rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.6rem",
  },
  borderBottom: "0.2rem dashed #8377",
  whiteSpace: "nowrap",
  padding: "1rem",
}));

const Details = styled("div")(({ theme }) => ({
  fontSize: "1.2rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}));

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  flexBasis: "25%",
  height: "fit-content",
//   border: "0.2rem solid #efebeb",
  whiteSpace: "nowrap",
}));

const DetailsRowWrapper = styled(Wrapper)(({ theme }) => ({
  justifyContent: "space-between",
  flexDirection: "row",
  flexBasis: "100%",
  border: "none",
}));

const DetailsWrapper = styled(Wrapper)(({ theme }) => ({
  gap: "0.5rem",
  border: "none",
  padding: "1rem",
}));

const OrderSummary = ({ tax, totalItems, totalPrice, handleOpen }) => {
  return (
    <Wrapper>
      <Heading>Bill Details</Heading>
      <DetailsWrapper>
        <DetailsRowWrapper>
          <Details>Total Items</Details>
          <Details>{totalItems}</Details>
        </DetailsRowWrapper>

        <DetailsRowWrapper>
          <Details>Item Total</Details>
          <Details>{totalPrice}</Details>
        </DetailsRowWrapper>

        <DetailsRowWrapper>
          <Details>Tax</Details>
          <Details>{tax}</Details>
        </DetailsRowWrapper>

        {/* <DetailsRowWrapper>
          <Details>D</Details>
          <Details>{totalPrice}</Details>
        </DetailsRowWrapper> */}
      </DetailsWrapper>

      <Button variant="contained" onClick={handleOpen} size="medium">
        Checkout
      </Button>
    </Wrapper>
  );
};

export default OrderSummary;
