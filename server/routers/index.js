const userRouter = require('./userRouter');
const vendorRouter = require('./vendorRouter');
const productsRouter = require('./productRouter');
const CartRouter = require('./cartRouter');
const UserPaymentRouter = require('./user_paymentRouter');
const paymentRouter = require('./paymentsRouter');
const orderRouter = require('./orderRouter');
const TagRouter = require('./tagRouter');
const DiscountRouter = require('./discountRouter');
const addressRouter = require('./addressRouter');
const categoryRouter = require('./categoryRouter');
const ReviewRouter = require('./reviewRouter');

module.exports = {
    userRouter,
    vendorRouter,
    productsRouter,
    CartRouter,
    UserPaymentRouter,
    paymentRouter,
    orderRouter,
    TagRouter,
    DiscountRouter,
    addressRouter,
    categoryRouter,
    ReviewRouter
}