const express = require('express');
const CartRouter = express.Router();
const Products = require('../models/products');
const mongoose = require('mongoose');
const authenticate = require('../authentication');
const CartItem = require('../models/cart_items');
const { isNull } = require('lodash');
const Session = require('../models/session');
CartRouter.route('/')
    .get(authenticate.verifyUser, (req, res, next) => {
        CartItem.find({ sessionId: req.body.sessionId }).then(data => {
            // .populate({ path: 'products', populate: { path: "productId", select: "images productName" } }).then(data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(err => next(err))

    });
// .post((req, res, next) => {

//     console.log(req.body);

//     Cart.create({ userId: req.user._id }).then(data => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(data);
//     }, err => next(err)).catch(e => console.log(e));
// })

CartRouter.route('/')
    .post(authenticate.verifyUser, (req, res, next) => {
        // let id = req.params.id;
        let { id, quantity } = req.body;
        Session.find({ userId: req.user.id }).then(data => {
            let sessionId = data[0]._id;
            Products.findById(id).then(product => {
                if (quantity == undefined) {
                    quantity = 1;
                }
                if (product.availability - quantity >= 0) {
                    product.updateAvailability(id, -quantity, next).then(() => {
                        CartItem.create({ sessionId: sessionId, productId: id, quantity: quantity }, (err, doc) => {
                            if (err) {
                                next(err);
                            }
                            else {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json(doc);
                                // cartItem = doc;
                                // Cart.findOne({ userId: req.user._id }, (err, docs) => {
                                //     if (err) {
                                //         next(err);
                                //     }
                                //     else {
                                //         docs.products.push(cartItem);
                                //         docs.save();
                                //         res.statusCode = 200;
                                //         res.setHeader('Content-Type', 'application/json');
                                //         res.json(docs);
                                //     }
                                // })
                            }
                        })
                    })
                } else {
                    res.statusCode = 200;
                    res.setHeader('ContentType', 'application/json');
                    res.json('Item not available')
                }
            }).catch(err => next(err))

        }, err => next(err))


    })

CartRouter.route('/delete/:id')
    .delete(authenticate.verifyUser, (req, res, next) => {
        // let { cartId } = req.body;
        // let cartId = req.params.id;
        // Cart.findByIdAndUpdate({ _id: cartId }, {
        //     $pull: {
        //         products: mongoose.Types.ObjectId(req.params.id)
        //     }
        // }
        // ).then(() => {
        // AndDelete
        CartItem.findByIdAndDelete({ _id: req.params.id }).then(data => {
            Products.findById(data.productId).then(
                product => {
                    product.updateAvailability(product._id, data.quantity, next).then(result => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json(data);
                    })
                }, err => next(err)
            )
            // console.log(data)
            // console.log(data);
            // res.statusCode = 200;
            // res.setHeader('Content-Type', 'application/json');
            // res.json(data);
        })
        // })
    })

// CartRouter.route('/incr/:id')
//     .post(authenticate.verifyUser, (req, res, next) => {
//         console.log(req.headers)
//         res.json();
//     })

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
                        if (product.availability - 1 >= 0) {
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
                        } else {
                            res.statusCode = 200;
                            res.setHeader('ContentType', 'application/json');
                            res.json('Item not available')
                        }
                    }
                }).clone()


            }
        });
    });

CartRouter.route('/decrement/:id')
    .post(authenticate.verifyUser, (req, res, next) => {
        // let { orderId } = req.body;
        let orderId = req.params.id;
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
                                if (doc.quantity - 1 > 0) {
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
                                } else {
                                    doc.delete(doc._id, next).then(result => {
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json(result);
                                    })
                                }
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