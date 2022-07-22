const mongoose = require('mongoose');
const Orders = require('../models/order');
const { CartItem, Order_items, Payment, Sessions, User } = require('../models');

const { createError } = require('../error');

const getOrder = async (req, res, next) => {
    try {
        const orders = await Orders.find({ userId: req.user.id });
        res.statusCode = 200;
        res.setHeader('ContentType', 'appliation/json');
        res.json(orders);
    } catch (error) {
        next(error);
    }
}

const getOrderItems = async (req, res, next) => {
    try {
        const orders = await Order_items.find({})
        res.statusCode = 200;
        res.setHeader('ContentType', 'appliation/json');
        res.json(orders);
    } catch (error) {
        next(error);
    }
}

const checkout = async (req, res, next) => {
    try {
        let { paymentMode, provider } = req.body;
        const user = await User.findById(req.user.id);
        const session = await Sessions.findOne({ userId: user._id }, 'total');
        const doc = new Orders({ userId: req.user._id, total: session.total })

        // const payment = await Payment.create({ orderId: mongoose.Types.ObjectId(doc._id), amount: session.total, paymentMode: paymentMode, provider: provider });

        const cartItems = await CartItem.find({ sessionId: session._id });
        const insertedItems = await Order_items.insertMany(cartItems);
        const orderSummary = insertedItems.map(items => items._id);
     
        doc.orderSummary = [...orderSummary];

        console.log(doc);

        const createdOrder = await doc.save();
        res.statusCode = 200;
        res.setHeader('ContentType', 'appliation/json');
        res.json("createdOrder");
    } catch (error) {
        next(error);
    }
}

module.exports = { getOrder, getOrderItems, checkout };