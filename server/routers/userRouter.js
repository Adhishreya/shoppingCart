const userRouter = require('express').Router();
const Users = require('../models/user');
const passport = require('passport');
const authenticate = require('../authentication');
const cloudinary = require('cloudinary').v2;
const {Sessions} = require('../models');

const multer = require('multer');
// const { Session } = require('express-session');
const upload = multer();

require('dotenv').config();

const config = {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
};
cloudinary.config(config);

userRouter.route('/profile')
    .get(authenticate.verifyUser, (req, res) => {
        // console.log(req.user)
        Users.find({ _id: req.user.id }).populate('address').then((users) => {
            // res.sendStatus(200);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json  ');
            res.send(users);
        }, err => next(err));;

    });

userRouter.route('/signup')
    .post((req, res, next) => {
        let { username, password, email, phoneNumber } = req.body;
        Users.register(new Users({ username: username }), password, (err, user) => {
            if (err) {
                next(err);
            }
            else {
                user.email = email;
                user.phoneNumber = phoneNumber;
                // user.address = null;/
                // user.cart = new Cart({ userId: user._id });

                user.save((err, user) => {
                    if (err) {
                        console.log(err)
                        res.statusCode = 500;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ err: err });
                        return;
                    }
                    Sessions.create({ userId: user._id }).then(session => {
                        passport.authenticate('local')(req, res, () => {
                            var token = authenticate.getTokens({ _id: req.user._id });
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({ success: true, status: 'Registration Successful!', token: token });
                        });
                    })

                })

            }
        })
    });
// , { failureFlash: true }
userRouter.post('/signin', passport.authenticate('local'), (req, res, next) => {
    var token = authenticate.getTokens({ _id: req.user._id });
    if (token) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: 'Login Successful!', token: token });
    } else {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: false, status: 'Login Unsuccessful!' });
    }
    // Cart.find({ userId: req.user._id }, (err, cart) => {
    //     if (err) {
    //         next(err);
    //     }
    //     else {
    //         res.setStatus = 200;
    //         res.cookie('token', token, { httpOnly: true });
    //         res.setHeader('Content-Type', 'aplication/json');
    //         res.send({ success: true, status: "Successfully Registered", token: token });
    //     }
    //  else {
    //     console.log("Cart", cart);
    //     if (cart.length == 0) {
    //         Cart.create({ userId: req.user._id }, (err, cart) => {
    //             if (err) {
    //                 next(err);
    //             } else {
    //                 res.setStatus = 200;
    //                 res.cookie('token', token, { httpOnly: true });
    //                 res.setHeader('Content-Type', 'aplication/json');
    //                 res.send({ success: true, status: "Successfully Registered", token: token });
    //             }
    //         })
    //     }
    //     else {
    //         res.statusCode = 200;
    //         res.cookie('token', token, { httpOnly: true });
    //         res.setHeader('Content-Type', 'aplication/json');
    //         res.send({ success: true, status: "Successfully Registered", token: token });
    //     }
    // }

});

// });

userRouter.route('/:id')
    .get(authenticate.verifyUser, (req, res, next) => {
        console.log(req.params.id)
        Users.findById(req.params.id).then((user) => {

            if (user) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }
            else {
                err = new Error('User ' + req.params.id + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err))
    })
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
                // if (req.body.address) {
                //     user.address.push(req.body.address);
                //     user.save((err, user) => {
                //         if (err) {
                //             next(err);
                //         }
                //         else {
                //             res.statusCode = 200;
                //             res.setHeader('Content-Type', 'application/json');
                //             res.send(user);
                //         }
                //     });
                // }
                // else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
                // }
            }
        })

    }));

// userRouter.route('/addressUpdate')
//     .post(authenticate.verifyUser, (req, res, next) => {
//         console.log(req.body.address)
//         Users.findByIdAndUpdate({ _id: req.user.id }, { address: req.body.address }, (err, user) => {
//             if (err) {
//                 next(err);
//             }
//             else {
//                 res.statusCode = 200;
//                 res.setHeader('Content-Type', 'application/json');
//                 res.send(user);
//             }
//         })
//     });

userRouter.route('/uploadProfilePicture')
    .post(authenticate.verifyUser, upload.single("image"), (req, res, next) => {
        console.log(req.file);
        const image = req.file;
        if (image) {
            // cloudinary.uploader.unsigned_upload_stream
            cloudinary.uploader.upload_stream({ resource_type: 'raw' }, (err, result) => {
                if (err) {
                    next(err);
                } else {
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
                            res.send(user.displayPicture);
                        }
                    }
                    )
                }
            }).end(req.file.buffer);


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