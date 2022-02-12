const express = require('express');
const CartRouter = express.Router();
const Products = require('../models/products');
const mongoose = require('mongoose');
const authenticate = require('../authentication');
const { Cart, CartItem } = require('../models/cart');
const { isNull } = require('lodash');
CartRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Cart.find({ userId: req.user._id }).populate({ path: 'products', populate: { path: "productId", select: "images productName" } }).then(data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(err => next(err))

    })
// .post((req, res, next) => {

//     console.log(req.body);

//     Cart.create({ userId: req.user._id }).then(data => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(data);
//     }, err => next(err)).catch(e => console.log(e));
// })

CartRouter.route('/cartItem/:id')
    .post(authenticate.verifyUser, (req, res, next) => {
        let id = req.params.id;
        let { quantity } = req.body;
        var cartItem;
        console.log(req.url);
        Products.findById({ _id: id }, (err, product) => {
            if (err) {
                console.log(err);
            }
            console.log(quantity == undefined);
            if (quantity == undefined) {
                quantity = 1;
            }
            // number = quantity
            product.updateAvailability(id, -quantity, next).then(() => {
                CartItem.create({ productId: id, quantity: quantity }, (err, doc) => {
                    if (err) {
                        next(err);
                    }
                    else {
                        cartItem = doc;
                        Cart.findOne({ userId: req.user._id }, (err, docs) => {
                            if (err) {
                                next(err);
                            }
                            else {
                                docs.products.push(cartItem);
                                docs.save();
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(docs);
                            }
                        })
                    }
                })
            })
        }
        )
    })

CartRouter.route('/deleteCartItem/:id')
    .post(authenticate.verifyUser, (req, res) => {
        // let { cartId } = req.body;
        let cartId = req.params.id;
        Cart.findByIdAndUpdate({ _id: cartId }, {
            $pull: {
                products: mongoose.Types.ObjectId(req.params.id)
            }
        }
        ).then(() => {
            CartItem.findByIdAndDelete({ _id: req.params.id }).then(data => {
                console.log(data);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            })
        })
    })

CartRouter.route('/incr/:id')
    .post(authenticate.verifyUser, (req, res, next) => {
        console.log(req.headers)
        res.json();
    })

CartRouter.route('/increment/:id')
    .post(authenticate.verifyUser, (req, res, next) => {
        // let { orderId } = req.body;
        let orderId = req.params.id;
        CartItem.findById({ _id: orderId }, (err, doc) => {
            console.log(req.headers);
            if (doc === null) {
                // res.header('Authorization', req.headers.authentication);
                console.log(res.getHeaderNames());
                res.redirect(307, "/cart/cartItem/" + orderId);
                // res.redirect(302,"/")
            }
            if (err) {
                next(err);
            }
            if (doc) {
                Products.findById(doc.productId, (err, product) => {
                    if (err) {
                        console.log(err);
                        next(err);
                    }
                    else {
                        product.updateAvailability(product._id, -1, next)
                            .then((data) => {
                                console.log("Dataaaaaa" + data)
                                if (err) {
                                    next(err);
                                }
                                // else{
                                doc.increment(doc._id, next).then(result => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(result);
                                }
                                    , err => next(err)
                                );
                                // res.statusCode = 200;
                                // res.setHeader('Content-Type', 'application/json');
                                // res.json(doc);
                                // }

                            }, err => next(err));
                        ;
                    }
                }).clone()


            }
        });
    });

CartRouter.route('/decrement')
    .post(authenticate.verifyUser, (req, res, next) => {
        let { orderId } = req.body;
        // const cartSession = mongoose.startSession();//creating a session to create a transaction
        // (await cartSession).startTransaction(() => {//starting a transaction
        CartItem.findById({ _id: orderId }, (err, doc) => {
            if (err) {
                next(err);
            }
            else {
                Products.findById(doc.productId, (err, product) => {
                    if (err) {
                        console.log(err);
                        next(err);
                    }
                    else {
                        product.updateAvailability(product._id, +1, next)
                            .then((data) => {
                                console.log("Dataaaaaa" + data)
                                if (err) {
                                    next(err);
                                }
                                doc.decrement(doc._id, next).then(result => {
                                    if (result.quantity == 0) {
                                        res.redirect(307, "/cart/deleteCartItem/" + orderId);
                                    } else {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(result);
                                    }
                                    // res.statusCode = 200;
                                    // res.setHeader('Content-Type', 'application/json');
                                    // res.json(result);
                                }, err => next(err));
                            }, err => next(err));
                    }
                }).clone()
            }
        });
        // });



    })
// CartRouter.route('/checkout')
//     .get(authenticate.verifyUser, (req, res, next) => {
//         Cart.findOne({ userId: req.user._id }).populate('products').then(data => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(data);
//         }, err => next(err));
//     });

module.exports = CartRouter;