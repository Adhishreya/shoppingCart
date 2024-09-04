const { Sessions, CartItem, Orders, Payments } = require('../models');

const paymentSuccess = async (req, res, next) => {
    try {


        let { order_id, paymentMode } = req.body;
        const order = await Orders.findById(mongoose.Types.ObjectId(order_id));

        const payment = await Payments.findOneAndUpdate({ orderId: order_id }, { $set: { paymentStatus: 'Success', amount: order.total, paymentMode: paymentMode } });
        const session = await Sessions.findOneAndUpdate({ userId: req.user._id }, { $set: { total: 0 } });
        await CartItem.deleteMany({ userId: req.user._id })

        res.statusCode = 200;
        res.setHeader('ContentType', 'application/json');
        res.json('Order placed successfully');
    } catch (error) {
        next(error)
    }
}

module.exports = { paymentSuccess }