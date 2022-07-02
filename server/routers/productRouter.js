const productsRouter = require('express').Router();
const Products = require('../models/products');
const authenticate = require('../authentication');
const CartItem = require('../models/cart_items');
const mongoose = require('mongoose');

productsRouter.route('/')
    .get((req, res) => {
        const pageNumber = req.query.pageNumber - 1;
        const nPerPage = 1;
        // console.log(pageNumber)
        // .skip(pageNumber>0?((pageNumber-1)*nPerPage):0)
        //.limit(nPerPage)
        Products.find({}, 'productName images price _id tags availability discount').skip(2).populate('vendorDetails', 'companyName').populate('discount').populate('category').populate('tags').then((data) => {
            // .populate('vendorDetails').populate('discount').populate('reviews.userId').then((data)=>{
            // console.log(req.query.pageNumber)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(e => console.log('unsuccessful'))
    })
    .post(authenticate.verifyUser, authenticate.verifyVendor, (req, res, next) => {
        let { productName, description, sku, images, price, vendorDetails, availability, discount,
            category,
            tags } = req.body.productDetails;
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

productsRouter.route('/update/inventory/:productId')
    .put((authenticate.verifyUser, authenticate.verifyVendor, (req, res, next) => {
        let productId = req.params.productId;
        let { availability } = req.body;
        console.log(availability);
        Products.findByIdAndUpdate(productId, { $set: { availability } }, { new: true }).then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(e => next(e));
    })
    );
productsRouter.route('/filter')
    .get((req, res, next) => {
        let { category, tags, discount, lower, upper, pageNumber } = req.query;
        const nPerPage = 2;
        let page = pageNumber - 1;
        // .skip(pageNumber>0?((pageNumber-1)*nPerPage):0)
        //.limit(nPerPage)
        let filters = {}
        if (typeof category !== "undefined" && category !== null)
            filters.category = { $in: [mongoose.Types.ObjectId(category)] }
        if (typeof tags !== "undefined" && tags !== null)
            filters.tags = { $in: [mongoose.Types.ObjectId(tags)] }
        if (typeof discount !== "undefined" && discount !== null)
            filters.discount = { $in: [discount] }
        if (typeof lower !== "undefined" && lower !== null && typeof upper !== "undefined" && upper !== null) { filters.price = { $lt: parseInt(upper) * 100, $gt: parseInt(lower) * 100 } }
        // filters.
        Products.find(filters).populate('vendorDetails').skip(page > 0 ? (page * nPerPage) : 0).limit(nPerPage).populate('discount').populate('category').populate('tags').then(data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }, err => next(err))
    })
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
        Products.find({ _id: req.params.id }, 'quantity')
            .then(data => {
                res.sendStatus(200);
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }
                , err => next(err))
    });

productsRouter.route('/categories/:id')
    .get((req, res) => {
        Products.find({ category: { $in: [mongoose.Types.ObjectId(req.params.id)] } }).then(data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }, err => next(err))
    })

productsRouter.route('/tags/:id')
    .get((req, res) => {
        Products.find({ tags: { $in: [mongoose.Types.ObjectId(req.params.id)] } }).then(data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }, err => next(err))
    })

productsRouter.route('/discount/:id')
    .get((req, res) => {
        Products.find({ discount: { $in: [mongoose.Types.ObjectId(req.params.id)] } }).then(data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }, err => next(err))
    })

productsRouter.route('/price/range/')
    .get((req, res, next) => {
        console.log(req.query.lower);
        Products.find({ price: { $gt: parseInt(req.query.lower), $lt: parseInt(req.query.upper) } }).then(data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }, err => next(err))
    })


module.exports = productsRouter;
