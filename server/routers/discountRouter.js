const DiscountRouter = require('express').Router();
const authenticate = require('../authentication');

const {getDiscounts,addDiscounts} = require('../controller/discountController');

DiscountRouter.route('/')
    .get(getDiscounts)
    .post(authenticate.verifyUser, authenticate.verifyVendor, addDiscounts);

module.exports = DiscountRouter;
