const stripeRouter = require("express").Router();
require("dotenv").config();

const authenticate = require("../authentication");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

stripeRouter.post("/checkout", async (req, res) => {
  const details = req.body;
  const paymentIndent = await stripe.paymentIntents.create({
    amount: details,
    currency: "usd",
    payment_method_types: ["card"],
  });
  res.send({ clientSecret: paymentIndent.client_secret });
});

module.exports = stripeRouter;
