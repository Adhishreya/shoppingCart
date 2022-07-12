const DiscountRouter = require('express').Router();
var {Discount} = require('../models');
const authenticate = require('../authentication');

DiscountRouter.route('/')
    .get((req, res) => {
        Discount.find({}).then(data => {
            console.log(data.discountEndDate);
            console.log(new Date());
            res.statusCode = 200;
            res.header('ContentType', 'application/json');
            res.json(data);
        });
    })
    .post(authenticate.verifyUser, authenticate.verifyVendor, (req, res) => {
        let { name, description, value, discountStartDate, discountEndDate } = req.body;
        Discount.create({ name, description, value, discountStartDate, discountEndDate }).then(data => {
            res.statusCode = 200;
            res.header('ContentType', 'application/json');
            res.json(data);
        }).catch(err => {
            res.statusCode = 400;
            res.header('ContentType', 'application/json');
            res.json(err);
        });
    })

module.exports = DiscountRouter;
