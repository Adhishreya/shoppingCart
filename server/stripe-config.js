const Stripe = require("stripe");
require("dotenv").config();

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = Stripe(process.env.PUBLISHABLE_KEY);