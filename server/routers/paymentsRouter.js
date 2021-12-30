var paymentRouter = require('express').Router();
var Paymets = require('../models/payment');
var authenticate = require('../authentication');
var Orders = require('../models/order');
paymentRouter.route('/')
    .post(authenticate.verifyUser, (req, res, next) => {
        const mode = req.body.paymentMode;
        Orders.find({ userId: req.user._id }).then(order => {
            var total  =order[0].total + order[0].tax + order[0].shippingCost;
            console.log(total);
            Paymets.create({paymentMode: mode, paymentStatus: 'Pending', amount: total }).then(payment => {
                // order.paymentId = payment._id;
                // order.save().then(order => {
                //     res.statusCode = 200;
                //     res.setHeader('Content-Type', 'application/json');
                //     res.json(order);
                // });
                Orders.findByIdAndUpdate(order[0]._id, { paymentId: payment._id, paymentDate: new Date() }).then(order => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(order);
                });
         
            });
        }
            , err => next(err));
    });

module.exports = paymentRouter;