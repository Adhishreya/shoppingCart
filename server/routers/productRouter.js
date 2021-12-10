const productsRouter = require('express').Router();
const Products = require('../models/products');
productsRouter.route('/')
    .get((req, res) => {
        Products.find({}).then((data) => {
            // .populate('vendorDetails').populate('discount').populate('reviews.userId').then((data)=>{
            res.sendStatus(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(data);


        }).catch(e => console.log('unsuccessful'))
    });
module.exports = productsRouter;
