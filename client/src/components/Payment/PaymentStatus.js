import { styled, alpha } from "@mui/material/styles";
import { FAIL_PAYMENT, SUCCESS_PAYMENT } from "../../constants/dataUri";
import { Button } from "@mui/material";

const BoxWrapper = styled("div")(({ theme }) => ({
  // [theme.breakpoints.down("sm")]: {
  //   width: "calc(100% - 6.4rem)",
  // },
  display: "flex",
  flexDirection: "column",
  height: "100%",
  justifyContent: "center",
  width: "calc(100% - 4rem)",
  margin: "auto",
  alignItems: "center",
}));

const DetailsWrapper = styled(BoxWrapper)(({ theme }) => ({
  // [theme.breakpoints.down("sm")]: {
  //   width: "calc(100% - 6.4rem)",
  // },
  gap: "1rem",
  width: "100%",
  textAlign: "center",
}));

const Typography = styled("div")(({ theme }) => ({
  fontSize: "2rem",
  [theme.breakpoints.down("ms")]: {
    fontSize: "1.2rem",
  },
  // width: "fit-content",
  alignItems: "center",
}));

const Image = styled("img")(({ theme }) => ({
  // [theme.breakpoints.down("sm")]: {
  //   width: "calc(100% - 6.4rem)",
  // },
  display: "flex",
  maxWidth: "63%",
}));

const PaymentStatus = ({ isSuccess, setOpen }) => {
  return (
    <BoxWrapper>
      <Image src={isSuccess ? SUCCESS_PAYMENT : FAIL_PAYMENT} />
      <DetailsWrapper>
        <Typography>Payment {isSuccess ? "Successful" : "Failed"}</Typography>
        <Button
          variant="contained"
          type="button"
          color={isSuccess ? "success" : "error"}
          onClick={() => setOpen(false)}
        >
          {isSuccess ? "Ok" : "Try Again"}
        </Button>
      </DetailsWrapper>
    </BoxWrapper>
  );
};

export default PaymentStatus;
