const express = require('express');
const CartRouter = express.Router();
const Products = require('../models/products');
const mongoose = require('mongoose');
const authenticate = require('../authentication');
const { Cart, CartItem } = require('../models/cart');
CartRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        Cart.find({}).populate('products').then(data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        })

    })
// .post((req, res, next) => {

//     console.log(req.body);

//     Cart.create({ userId: req.user._id }).then(data => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(data);
//     }, err => next(err)).catch(e => console.log(e));
// })

CartRouter.route('/:id')
    .post(authenticate.verifyUser, (req, res, next) => {
        let id = req.params.id;
        let { quantity } = req.body;
        var cartItem;
        console.log(id);
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
    .delete((req, res) => {
        let { cartId } = req.body;
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


CartRouter.route('/increment')
    .put((req, res, next) => {
        let { orderId } = req.body;
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
                        product.updateAvailability(product._id, -1, next)
                            .then((data) => {
                                console.log("Dataaaaaa" + data)
                                if (err) {
                                    next(err);
                                }
                                // else{
                                doc.increment(doc._id, next);
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(doc);
                                // }

                            }, err => next(err));
                        ;
                    }
                }).clone()


            }
        });
    });

CartRouter.route('/decrement')
    .put(async(req, res, next) => {
        let { orderId } = req.body;
        const cartSession = mongoose.startSession();//creating a session to create a transaction
        (await cartSession).startTransaction(()=>{//starting a transaction
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
                                    doc.decrement(doc._id, next);
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(doc);
                                }, err => next(err));
                        }
                    }).clone()
                }
            });
        });

        

    });
module.exports = CartRouter;