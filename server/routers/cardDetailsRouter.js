var mongoose = require('mongoose');
var CardRouter = require('express').Router();
var Card = require('../models/userPayment');
var authenticate = require('../authentication');

CardRouter.route('/')
    .get(authenticate.verifyUser, (req, res) => {
        Card.find({ userId: req.user._id }).populate('userId.username').then(data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        })

        // , (err, card) => {
        //     if (err)
        //         next(err);
        //     else
        //         res.json(card);
        // })
    })
    .post(authenticate.verifyUser, (req, res) => {
        const { cardNumber, expiryMonth, expiryYear, cardName } = req.body;
        Card.create({
            userId: req.user._id,
            cardNumber,
            expiryMonth,
            expiryYear,
            cardName
        }, (err, card) => {
            if (err)
                next(err);
            else
                res.json(card);
        });
    });

module.exports = CardRouter;