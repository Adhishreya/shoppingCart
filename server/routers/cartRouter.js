const express = require("express");
const authenticate = require("../authentication");
const CartRouter = express.Router();
const { CartItem, Session, Products } = require("../models");
const { isNull } = require("lodash");
const mongoose = require("mongoose");
CartRouter.route("/").get(authenticate.verifyUser, (req, res, next) => {
  Session.findOne({ userId: req.user.id }).then(
    (session) => {
      if (session) {
        CartItem.find({ sessionId: session._id })
          .populate("productId", "images productName price")
          .then((data) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(data);
          })
          .catch((err) => next(err));
      } else {
        Session.create({ userId: req.user.id }).then((data) => {
          res.statusCode = 200;
          res.json(null);
        });
      }
    },
    (err) => next(err)
  );
});

CartRouter.route("/:id").post(authenticate.verifyUser, (req, res, next) => {
  let id = req.params.id;
  let { quantity } = req.body;
  Session.find({ userId: req.user.id }).then(
    (data) => {
      let sessionId = data[0]._id;
      Products.findById(id)
        .then((product) => {
          if (quantity == undefined) {
            quantity = 1;
          }
          if (product.availability - quantity >= 0) {
            product
              .updateAvailability(
                id,
                -quantity,
                next,
                data[0]._id,
                data[0].total
              )
              .then((data1) => {
                console.log("data" + data1);
                CartItem.create(
                  { sessionId: sessionId, productId: id, quantity: quantity },
                  (err, doc) => {
                    if (err) {
                      next(err);
                    } else {
                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json(doc);
                    }
                  }
                );
              });
          } else {
            res.statusCode = 200;
            res.setHeader("ContentType", "application/json");
            res.json("Item not available");
          }
        })
        .catch((err) => next(err));
    },
    (err) => next(err)
  );
});

CartRouter.route("/delete/:id").delete(
  authenticate.verifyUser,
  (req, res, next) => {
    Session.find({ userId: req.user.id }, (error, session) => {
      CartItem.findByIdAndDelete({ _id: req.params.id }).then(
        (data) => {
          console.log(data);
          Products.findById(data.productId).then(
            (product) => {
              product
                .updateAvailability(
                  product._id,
                  data.quantity,
                  next,
                  session[0]._id,
                  session[0].total
                )
                .then((result) => {
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json(data);
                });
            },
            (err) => next(err)
          );
        },
        (err) => next(err),
        (err) => next(err)
      );
    });
  }
);

CartRouter.route("/increment/:id").post(
  authenticate.verifyUser,
  (req, res, next) => {
    let id = req.params.id;
    Session.findOne({ userId: req.user.id }, (error, session) => {
      CartItem.find(
        { productId: mongoose.Types.ObjectId(id), sessionId: session._id },
        (err, doc) => {
          if (doc === null || doc.length === 0) {
            res.redirect(307, "/cart/" + id);
          } else if (err) {
            next(err);
          } else {
            Products.findById(doc[0].productId, (err, product) => {
              if (err) {
                next(err);
              } else {
                if (product.availability - 1 >= 0) {
                  product
                    .updateAvailability(
                      product._id,
                      -1,
                      next,
                      session._id,
                      session.total
                    )
                    .then(
                      (data) => {
                        if (err) {
                          next(err);
                        }
                        doc[0].increment(doc[0]._id, next).then(
                          (result) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(result);
                            // session.total+=
                            // session.calculteTotal(session._id,product.price,)
                          },
                          (err) => next(err)
                        );
                      },
                      (err) => next(err)
                    );
                } else {
                  res.statusCode = 200;
                  res.setHeader("ContentType", "application/json");
                  res.json("Item not available");
                }
              }
            }).clone();
          }
        }
      );
    });
  }
);

CartRouter.route("/decrement/:id").post(
  authenticate.verifyUser,
  (req, res, next) => {
    let orderId = req.params.id;
    Session.find({ userId: req.user.id }).then(
      (session) => {
        CartItem.find(
          { productId: orderId, sessionId: session[0]._id },
          (err, doc) => {
            if (err) {
              next(err);
            } else {
              Products.findById(doc[0].productId, (err, product) => {
                if (err) {
                  next(err);
                } else {
                  product
                    .updateAvailability(
                      product._id,
                      +1,
                      next,
                      session[0]._id,
                      session[0].total
                    )
                    .then(
                      (data) => {
                        if (err) {
                          next(err);
                        }
                        if (doc[0].quantity - 1 > 0) {
                          doc[0].decrement(doc[0]._id, next).then(
                            (result) => {
                              if (result.quantity == 0) {
                                res.redirect(
                                  307,
                                  "/cart/deleteCartItem/" + orderId
                                );
                              } else {
                                res.statusCode = 200;
                                res.setHeader(
                                  "Content-Type",
                                  "application/json"
                                );
                                res.json(result);
                              }
                            },
                            (err) => next(err)
                          );
                        } else {
                          doc[0].delete(doc[0]._id, next).then((result) => {
                            res.statusCode = 200;
                            res.setHeader("Content-Type", "application/json");
                            res.json(result);
                          });
                        }
                      },
                      (err) => next(err)
                    );
                }
              }).clone();
            }
          }
        );
      },
      (err) => next(err)
    );
  }
);

CartRouter.route("/quantity/:id").get(
  authenticate.verifyUser,
  (req, res, next) => {
    let id = req.params.id;
    Session.find({ userId: req.user.id }).then(
      (session) => {
        Cart.find({ productId: id, sessionId: session[0]._id }).then(
          (data) => {
            res.setHeader("Content-Type", "application/json");
            if (data === null) {
              res.statusCode = 404;
              res.json(0);
            } else {
              res.statusCode = 200;
              res.json(data[0].quantity);
            }
          },
          (err) => next(err)
        );
      },
      (err) => next(err)
    );
  }
);

// CartRouter.route('/checkout')
//     .get(authenticate.verifyUser, (req, res, next) => {
//         Cart.findOne({ userId: req.user._id }).populate('products').then(data => {
//             res.statusCode = 200;
//             res.setHeader('Content-Type', 'application/json');
//             res.json(data);
//         }, err => next(err));
//     });

module.exports = CartRouter;
