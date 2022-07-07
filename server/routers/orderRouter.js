var mongoose = require('mongoose');
var currency = mongoose.Types.Currency;
var Orders = require('../models/order');
var orderRouter = require('express').Router();
var authenticate = require('../authentication');
var CartItem = require('../models/cart_items');
var Products = require('../models/products');
var { calculateTotal } = require('../methods/calculateTotal');
const Order_items = require('../models/order_items');
const Payment = require('../models/payment');
const Sessions = require('../models/session');
const User = require('../models/user');
const { session } = require('passport');



orderRouter.route('/')
    .get(authenticate.verifyUser, (req, res) => {
        Orders.find({userId:req.user.id}).then(result=>{
            res.statusCode = 200;
            res.setHeader('ContentType','appliation/json');
            res.json(result)
        })
    })

orderRouter.route('/checkout')
    .post(authenticate.verifyUser, (req, res, next) => {
        User.findById(req.user.id).then(user => {
            Sessions.findOne({ userId: user._id }, 'total').then(data => {
                Orders.create({ userId: req.user._id, total: data.total }, (err, doc) => {
                    if (err) {
                        next(err);
                    }
                    else {
                        Payment.create({ orderId: doc._id, amount: data.total }).then(payment => {
                            CartItem.find({ sessionId: data._id }).then(data => {
                                Order_items.insertMany(data).then(() => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(doc._id);
                                }).catch(err => next(err));
                            }).catch(err => next(err))
                        }).catch(err => next(err));
                    }
                })

            });
        })
    });

orderRouter.route('/cancel')
    .post(authenticate.verifyUser, (req, res) => {

    })

// orderRouter.route('/')
//     .get(authenticate.verifyUser, (req, res, next) => {
//         Orders.find({ userId: req.user._id }).then(orders => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(orders);
//         })
//     })
//     .post(authenticate.verifyUser, (req, res, next) => {
//         Cart.find({}).populate('products').then(data => {
//             var total = 0;
//             var itemCount = 0;
//             var summary = [];
//             calculateTotal(data[0].products).then(result => {
//                 summary = result[0];
//                 total = result[1].total;
//                 itemCount = result[1].itemCount;

//                 var tax = 90.12;
//                 var shippingCost = 10.12;

//                 Orders.create({ userId: req.user._id, orderSummary: summary, total: total, tax: tax, shippingCost: shippingCost, itemCount: itemCount }).then(order => {
//                     /* Remove from cart to be done later */
//                     res.statusCode = 200;
//                     res.send(order);
//                     // Cart.findByIdAndRemove(data[0]._id).then(cart => {
//                     //     res.statusCode = 200;
//                     //     res.setHeader('Content-Type', 'application/json');
//                     //     res.json(order);
//                     // });
//                 });
//             });

//         }, err => next(err));

//     })

module.exports = orderRouter;
