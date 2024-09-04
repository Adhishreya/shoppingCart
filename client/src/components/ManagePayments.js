import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { PUBLISHABLE_KEY } from "../config";

const ManagePayments = () => {
  return <CheckOutForm />;
};

const CheckOutForm = () => (
  <form>
    <input name="card-holder-name" />
    <input name="card-holder-address" />
    <input name="card-expiry-month" />
    <input name="card-expiry-year" />
  </form>
);

export default ManagePayments;
