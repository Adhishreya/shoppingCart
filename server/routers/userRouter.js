const userRouter = require('express').Router();
const Users = require('../models/user');
const { Cart } = require('../models/cart');
const passport = require('passport');
const authenticate = require('../authentication');
const cloudinary = require('cloudinary').v2;
const { result } = require('lodash');
const e = require('express');
require('dotenv').config();

const config ={
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
}
console.log(config);

cloudinary.config(config);

userRouter.route('/profile')
    .get(authenticate.verifyUser, (req, res) => {
        // console.log(req.user)
        Users.find({ _id: req.user.id }).then((users) => {
            // res.sendStatus(200);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json  ');
            res.send(users);
        }, err => next(err));;

    });

userRouter.route('/signup')
    .post((req, res, next) => {
        let { username, password, email, phoneNumber, address } = req.body;
        Users.register(new Users({ username: username }), password, (err, user) => {
            if (err) {
                next(err);
            }
            else {
                user.email = email;
                user.phoneNumber = phoneNumber;
                // user.address = address;
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                        return;
                    }

                    passport.authenticate('local')(req, res, () => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ success: true, status: 'Registration Successful!' });
                    });
                })

            }
        })
    });
userRouter.post('/signin', passport.authenticate('local', { failureFlash: true }), (req, res) => {

    var token = authenticate.getTokens({ _id: req.user._id });
    console.log(req.user.cart.length == 0);
    if (req.user.cart.length == 0) {
        Cart.create({ userId: req.user._id }, (err, cart) => {
            if (err) {
                next(err);
            }
            Users.findByIdAndUpdate(req.user._id, { $set: { cart: cart._id } }, (err, user) => {
                if (err) {
                    next(err);
                }
                req.user.cart = cart._id;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.send({ success: true, status: "Successfully Registered", token: token });
            })

        })
    }
    else {
        res.setStatus = 200;
        res.setHeader('Content-Type', 'aplication/json');
        res.send({ success: true, status: "Successfully Registered", token: token });
    }
});

userRouter.route('/:id')
    .put((authenticate.verifyUser, (req, res, next) => {
        let updateFields = {};
        if (req.body.email) {
            updateFields.email = req.body.email;
        }
        if (req.body.phoneNumber) {
            updateFields.phoneNumber = req.body.phoneNumber;
        }
        if (req.body.displayPicture) {
            updateFields.displayPicture = req.body.displayPicture;
        }
        Users.findByIdAndUpdate({ _id: req.params.id }, { $set: updateFields }, (err, user) => {
            if (err) {
                next(err);
            }
            else {
                if (req.body.address) {
                    user.address.push(req.body.address);
                    user.save((err, user) => {
                        if (err) {
                            next(err);
                        }
                        else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.send(user);
                        }
                    });
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);
                }
            }
        })

    }));

userRouter.route('/addressUpdate/:id')
    .put(authenticate.verifyUser, (req, res, next) => {
        Users.findByIdAndUpdate({ _id: req.params.id }, { $pull: { address: req.body.address } }, (err, user) => {
            if (err) {
                next(err);
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.send(user);
            }
        })
    });

userRouter.route('/uploadProfilePicture')
    .post(authenticate.verifyUser, (req, res, next) => {
        const image = req.body.image;
        if (image) {
            cloudinary.uploader.upload(image).then(result => {
                Users.findByIdAndUpdate({ _id: req.user._id }, {
                    $set: {
                        displayPicture: result.secure_url
                    }
                }, (err, user) => {
                    if (err) {
                        next(err);
                    }
                    else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.send(user);
                    }
                }
                )
            }, err => next(err));
        } else {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: "No Image Provided" });
        }
    })
// var authenticate = Users.authenticate();
// authenticate(email,password,(err,result)=>{
//     if(err){
//         res.sendStatus(500);
//         res.setHeader('Content-Type','application/json  ');
//         res.send({err:err});
//     }
//     res.sendStatus(200);
//     res.setHeader('Content-Type','application/json  ');
//     res.send({result:result});
// }
// })


module.exports = userRouter;