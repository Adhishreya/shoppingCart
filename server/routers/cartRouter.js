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
        Session.find({ userId: req.user.id }).then(
            session => {
                // console.log(session)
                CartItem.find({ sessionId: session[0]._id }).populate('productId', 'images productName price').then(data => {
                    // .populate({ path: 'products', populate: { path: "productId", select: "images productName" } }).then(data => {
                    // console.log(data)
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(data);
                }).catch(err => next(err))
            }, err => next(err)
        )
    });
// .post((req, res, next) => {
//     Cart.create({ userId: req.user._id }).then(data => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(data);
//     }, err => next(err)).catch(e => console.log(e));
// })

CartRouter.route('/:id')
    .post(authenticate.verifyUser, (req, res, next) => {
        let id = req.params.id;
        // console.log(req.body)
        let { quantity } = req.body;
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
    .delete( (req, res, next) => {
        // let { cartId } = req.body;
        // let cartId = req.params.id; authenticate.verifyUser
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
        })


        // res.statusCode = 200;
        // res.setHeader('Content-Type', 'application/json');
        // res.json('data');

        // })
    })

// CartRouter.route('/incr/:id')
//     .post(authenticate.verifyUser, (req, res, next) => {
//         res.json();
//     })

CartRouter.route('/increment/:id')
    .post(authenticate.verifyUser, (req, res, next) => {
        // let { orderId } = req.body;
        let id = req.params.id;
        Session.find({ userId: req.user.id }).then(
            session => {
                CartItem.findById({ _id: id, sessionId: session._id }, (err, doc) => {
                    if (doc === null) {
                        // res.header('Authorization', req.headers.authentication);
                        // res.json({id:id})
                        // req.body = {id:id}
                        // req.set("POST",{id:id})
                        // console.log(req.body);
                        res.redirect(307, "/cart/" + id);
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
            }, err => next(err)
        )
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