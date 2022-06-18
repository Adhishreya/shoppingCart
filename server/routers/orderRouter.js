var mongoose = require('mongoose');
var currency = mongoose.Types.Currency;
var Orders = require('../models/order');
var orderRouter = require('express').Router();
var authenticate = require('../authentication');
var CartItem  = require('../models/cart_items');
var Products = require('../models/products');
var { calculateTotal } = require('../methods/calculateTotal');
const Order_items = require('../models/order_items');
const Payment = require('../models/payment');
const Sessions = require('../models/session')

orderRouter.route('/checkout')
    .post(authenticate.verifyUser, (req, res, next) => {
        Sessions.findOne({ sessionId: req.body.sessionId }, 'total').then(data => {
            Orders.create({ userId: req.user._id, total: data.total }, (err, doc) => {
                if (err) {
                    next(err);
                }
                else {
                    const ordersFetchId = doc._id;
                    // const total = doc.total;
                    console.log(doc)
                    Payment.create({ orderId: doc._id, amount: data.total }).then(payment => {

                        CartItem.find({ sessionId: req.body.sessionId }).then(data => {
                            let documents = [];
                            data.forEach(element => {
                                documents.push({ order_id: ordersFetchId, product_id: element.productId, quantity: element.quantity });
                            });
                            Order_items.insertMany(documents).then(() => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(ordersFetchId);
                            }).catch(err => next(err));
                            // }).catch(err => next(err));

                            // data.forEach(element => {
                            //     Order_items.create({ orderId: doc._id, productId: element.productId, quantity: element.quantity }, (err, doc) => {
                            //         if (err) {
                            //             next(err);
                            //         }
                            //         else {
                            //             res.statusCode = 200;
                            //             res.setHeader('Content-Type', 'application/json');
                            //             res.json(doc);
                            //         }
                            //     }).catch(err => next(err))
                            // }).catch(err => next(err))
                        }).catch(err => next(err))

                    }).catch(err => next(err));

                    // res.statusCode = 200;
                    // res.setHeader('Content-Type', 'application/json');
                    // res.json(doc);
                    // Order_items.create({orderId})

                }
            })
        });
    });

orderRouter.route('/cancel')
.post(authenticate.verifyUser,(req,res)=>{

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
