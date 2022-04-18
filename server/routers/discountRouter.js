const DiscountRouter = require('express').Router();
var Discount = require('../models/discount');

DiscountRouter.route('/')
.get((req,res)=>{
    Discount.find({}).then(data=>{
        res.statusCode= 200;
        res.header('ContentType','application/json');
        res.json(data);
    });
});

module.exports = DiscountRouter;
