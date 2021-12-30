var mongoose = require('mongoose');
var currency = mongoose.Types.Currency;
var Orders = require('../models/order');
var orderRouter = require('express').Router();
var authenticate = require('../authentication');
var { Cart, CartItem } = require('../models/cart');
var Products = require('../models/products');
var { calculateTotal } = require('../methods/calculateTotal');
orderRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Orders.find({ userId: req.user._id }).then(orders => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(orders);
        })
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        Cart.find({}).populate('products').then(data => {
            var total = 0;
            var itemCount = 0;
            var summary = [];
            calculateTotal(data[0].products).then(result => {
                summary = result[0];
                total = result[1].total;
                itemCount = result[1].itemCount;

                var tax = 90.12;
                var shippingCost = 10.12;

                Orders.create({ userId: req.user._id, orderSummary: summary, total: total, tax: tax, shippingCost: shippingCost, itemCount: itemCount }).then(order => {
                    /* Remove from cart to be done later */
                    res.statusCode = 200;
                    res.send(order);
                    // Cart.findByIdAndRemove(data[0]._id).then(cart => {
                    //     res.statusCode = 200;
                    //     res.setHeader('Content-Type', 'application/json');
                    //     res.json(order);
                    // });
                });
            });

        }, err => next(err));

    })

module.exports = orderRouter;
