// import { styled } from "@mui/material";
// import React from "react";

// const Box = styled("div")(({ theme }) => ({}));

// const Checkout = () => {
//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };

//   useEffect(() => {
//     if (selectDebit) {
//       getCardDetails(navigate).then((res) => {
//         setCardDetails(res.data);
//       });
//     } else setCardDetails([]);
//   }, [selectDebit]);
//   return (
//     <Box sx={style}>
//       {!selectDebit ? (
//         <>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Payment methods
//           </Typography>
//           <Typography
//             id="modal-modal-description"
//             sx={{ mt: 2 }}
//             style={{ cursor: "pointer" }}
//             onClick={() => {
//               orderCheckout("COD", "", setOpen, navigate);
//             }}
//           >
//             Cash On Delivery
//           </Typography>
//           <Typography
//             id="modal-modal-description"
//             sx={{ mt: 2 }}
//             style={{ cursor: "pointer" }}
//             onClick={() => setSelectDebit(true)}
//           >
//             Debit/Credit
//           </Typography>
//           <Typography
//             id="modal-modal-description"
//             sx={{ mt: 2 }}
//             style={{ cursor: "pointer" }}
//           >
//             UPI
//           </Typography>
//           <Typography
//             id="modal-modal-description"
//             sx={{ mt: 2 }}
//             style={{ cursor: "pointer" }}
//             onClick={() => {
//               orderCheckout("Wallet", "ShopPay", setOpen);
//             }}
//           >
//             Wallet
//           </Typography>
//         </>
//       ) : (
//         <>
//           <Typography id="modal-modal-title" variant="h6" component="h2">
//             Select Card
//           </Typography>
//           {cardDetails &&
//             cardDetails.map((card) => (
//               <Typography
//                 key={card._id}
//                 id="modal-modal-description"
//                 sx={{ mt: 2 }}
//                 onClick={() => {
//                   orderCheckout("Card", card.cardName);
//                 }}
//               >
//                 {card.cardName}{" "}
//                 {`${card.cardNumber.substr(0, 4)}...${card.cardNumber.substr(
//                   -4
//                 )}`}
//               </Typography>
//             ))}
//         </>
//       )}
//     </Box>
//   );
// };

// const Payment = () => {
//   return <></>;
// };

// export default Checkout;
