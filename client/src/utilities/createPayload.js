export const getPaymentKeys = (paymentMethod) => {
  const tempMethod = paymentMethod.toLowerCase();
  let mode = "COD";
  if (tempMethod.includes("cash")) mode = "COD";
  else if (tempMethod.includes("credit")) mode = "Card";
  else if (tempMethod.includes("upi")) mode = "UPI";

  return mode;
};
