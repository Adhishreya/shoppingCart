var mongoose = require('mongoose');
var currency = mongoose.Types.Currency;
var Orders = require('../models/order');
var orderRouter = require('express').Router();
var authenticate = require('../authentication');
var { Cart, CartItem } = require('../models/cart');
var Products = require('../models/products');

orderRouter.route('/')
    .post(authenticate.verifyUser, (req, res, next) => {
        Cart.find({ }).populate('products').then(data => {
            var total = 0;
            var itemCount = 0;
            var summary = [];
            for (var i = 0; i < data[0].products.length; i++) {
                var quant = data[0].products[i].quantity;
                Products.findById(data[0].products[i].productId).then(product => {
                    console.log(product.price);
                    total += product.price * quant;
                    console.log(total);
                    summary[i] = {
                        productName: product.productName,
                        quantity: quant,
                        price: product.price*quant
                    }
                });
                itemCount += quant;
            }
            console.log(summary);
            res.statusCode = 200;
            res.send(summary);
            // data[0].products.forEach(element => {
            //     Products.findById(element.productId, (err, product) => {
            //         if (err) {
            //             next(err);
            //         }
            //         else {
            //             product.updateAvailability(element.productId, -element.quantity, next).then(() => {
            //                 console.log('updated');
            //             }, err => next(err));
            //         }
            //     })
            // });
        }, err => next(err));


        // Orders.create({ cartId: data[0]._id, status: 'Pending',paymentMode:"COD",tax:50.34, }).then(data => {
        //     res.statusCode = 200;
        //     res.setHeader('Content-Type', 'application/json');
        //     res.json(data);
        // }, err => next(err)).catch(e => console.log(e));

        // Cart.find({ userId: req.user._id }).populate('products').then(data => {
        //     let total = 0;
        //     data.forEach(element => {
        //         total += element.total;
        //     });
        //     Order.create({
        //         userId: req.user._id,
        //         products: data,
        //         total: total
        //     }).then(data => {
        //         Cart.deleteMany({ userId: req.user._id }).then(() => {
        //             res.statusCode = 200;
        //             res.setHeader('Content-Type', 'application/json');
        //             res.json(data);
        //         })
        //     }, err => next(err)).catch(e => console.log(e));
        // })
    })

module.exports = orderRouter;
