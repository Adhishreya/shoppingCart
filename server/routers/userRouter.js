const userRouter = require('express').Router();
const Users = require('../models/user');
const passport = require('passport');
const authenticate = require('../authentication')
userRouter.route('/profile')
    .get(authenticate.verifyUser,(req, res) => {
        console.log(req.user)
        Users.find({_id:req.user.id}).then((users) => {
            // res.sendStatus(200);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json  ');
            res.send(users);
        }, err => next(err));;

    });

userRouter.route('/signup')
    .post((req, res, next) => {
        let { username, password, email, phoneNumber, address } = req.body;
        console.log({ username, password, email, phoneNumber })
        Users.register(new Users({ username: username }), password, (err, user) => {
            if (err) {
                next(err);
            }
            else {
                user.email = email;
                user.phoneNumber = phoneNumber;
                user.address = address;
                user.save((err, user) => {
                    passport.authenticate('local'), (req, res, next) => {
                        res.sendStatus(200);
                        res.setHeader('Content-Type', 'application/json  ');
                        res.json(user);
                    }
                });

            }

            // }))

        })
    });
userRouter.post('/signin', passport.authenticate('local', { failureFlash: true }), (req, res) => {

    var token = authenticate.getTokens({ _id: req.user._id });
    console.log(token);
    res.setStatus = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.send({ success: true, status: "Successfully Registered", token: token });
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