var paymentRouter = require('express').Router();
var Payments = require('../models/payment');
var authenticate = require('../authentication');
var Orders = require('../models/order');
const Sessions = require('../models/session');
const CartItem = require('../models/cart_items');
paymentRouter.route('/success')
    .post(authenticate.verifyUser, (req, res, next) => {
        let { order_id, paymentMode } = req.body;
        Orders.findById(order_id).then(order => {
            Payments.findOneAndUpdate({ orderId: order_id }, { $set: { paymentStatus: 'Success', amount: order.total, paymentMode: paymentMode } }).then(result => {
                Sessions.findOneAndUpdate({ userId: req.user._id }, { $set: { total: 0 } }).then(result => {
                    CartItem.deleteMany({ userId: req.user._id }).then(result => {
                        res.statusCode = 200;
                        res.setHeader('ContentType', 'application/json');
                        res.json('Order placed successfully')
                    })
                })
            }).catch(err => next(err));
        })
    })
// paymentRouter.route('/processing')
// .post(authenticate.verifyUser, (req, res, next) => {
//     const mode = req.body.paymentMode;
//     Orders.find({ userId: req.user._id }).then(order => {
//         var total  =order[0].total + order[0].tax + order[0].shippingCost;
//         console.log(total);
//         Paymets.create({paymentMode: mode, paymentStatus: 'Pending', amount: total }).then(payment => {
//             // order.paymentId = payment._id;
//             // order.save().then(order => {
//             //     res.statusCode = 200;
//             //     res.setHeader('Content-Type', 'application/json');
//             //     res.json(order);
//             // });
//             Orders.findByIdAndUpdate(order[0]._id, { paymentId: payment._id, paymentDate: new Date() }).then(order => {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.json(order);
//             });

//         });
//     }
//         , err => next(err));
// });
// paymentRouter.route('/pending')
//     .post(authenticate.verifyUser, (req, res) => {
//         let{order_id,payment_gateway} = req.body;
//         //check and modify
//     })
module.exports = paymentRouter;