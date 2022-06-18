const productsRouter = require('express').Router();
const Products = require('../models/products');
const passport = require('passport');
const authenticate = require('../authentication');
const CartItem = require('../models/cart_items');
const mongoose = require('mongoose');

productsRouter.route('/')
    .get((req, res) => {
        Products.find({}, 'productName images price _id tags availability discount').populate('vendorDetails', 'companyName').populate('discount').populate('category').populate('tags').then((data) => {
            // .populate('vendorDetails').populate('discount').populate('reviews.userId').then((data)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(e => console.log('unsuccessful'))
    })
    .post(authenticate.verifyUser, authenticate.verifyVendor, (req, res, next) => {
        let { productName, description, sku, images, price, vendorDetails, availability, discount,
            category,
            tags } = req.body;
            vendorDetails = mongoose.Types.ObjectId(vendorDetails);
        Products.create({
            productName, description, sku, images, price, vendorDetails, availability, discount,
            category,
            tags
        }).then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(e => next(e));
    });

// productsRouter.route('/')
productsRouter.route('/update/inventory/:productId')
    .put((authenticate.verifyUser, authenticate.verifyVendor, (req, res, next) => {
        let productId = req.params.productId;
        let { availability } = req.body;
        console.log(availability);
        Products.findByIdAndUpdate(productId, { $set: { availability } },{new:true}).then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(e => next(e));
    })
    );

productsRouter.route('/:productId')
    .get((req, res, next) => {
        let productId = req.params.productId;
        Products.findById(productId).populate('vendorDetails').populate('discount').populate('category').populate('tags').then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(e => next(e));
    })
    .delete((authenticate.verifyUser, authenticate.verifyVendor, (req, res, next) => {
        let productId = req.params.productId;
        Products.findByIdAndDelete(productId).then((data) => {
            CartItem.deleteMany({ productId: productId }).then(() => {
                res.sendStatus(200);
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }).catch(e => next(e));
        }).catch(e => next(e));
    }))
productsRouter.route('/quantity/:id')
    .get((req, res) => {
        Products.find({ _id: req.params.id}, 'quantity')
            .then(data => {
                res.sendStatus(200);
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }
                , err => next(err))
    })
module.exports = productsRouter;
