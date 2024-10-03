var paymentRouter = require('express').Router();
var Payments = require('../models/payment');
var authenticate = require('../authentication');
const mongoose = require('mongoose');

const {paymentSuccess} = require('../controller/paymentController');

paymentRouter.route('/success')
    .post(authenticate.verifyUser, paymentSuccess);
    
// paymentRouter.route('/processing')
// .post(authenticate.verifyUser, (req, res, next) => {
//     const mode = req.body.paymentMode;
//     Orders.find({ userId: req.user._id }).then(order => {
//         var total  =order[0].total + order[0].tax + order[0].shippingCost;
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