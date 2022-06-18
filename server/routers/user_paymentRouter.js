const PayDetails = require('../models/userPayment');
const User = require('../models/user');
const authenticate = require('../authentication');
const UserPaymentRouter = require('express').Router();

UserPaymentRouter.route('/')
    .get(authenticate.verifyUser, (req, res) => {
        PayDetails.find({ userId: req.user._id }).then(data => {
            res.statusCode = 200;
            res.header('ContentType', 'application/json');
            res.json(data);
        }, err => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        const userId = req.user.id;
        const { cardNumber, cardName, expiryMonth, expiryYear } = req.body;
        PayDetails.create({ userId, cardNumber, cardName, expiryMonth, expiryYear }).then(data => {
            res.statusCode = 200;
            res.setHeader('ContentType', 'application/json');
            res.json('Payment Details Successfully saved');
        }, err => next(err))
    });

UserPaymentRouter.route('/:id')
    .delete(authenticate.verifyUser, (req, res) => {
        // let id = req.user._id;
        let id = req.params.id;
        PayDetails.findByIdAndDelete({ _id: id }).then(data => {
            res.statusCode =200;
            res.setHeader('ContentType', 'applcation./json');
            res.json('Deleted the saved payment details')
        })
    })
// .delete(authenticate)

module.exports = UserPaymentRouter;