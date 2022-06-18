const SessionRouter = require('express').Router();
const Sessions = require('../models/session');
const CartItem = require('../models/cart_items');
const authenticate = require('../authentication');

SessionRouter.route('/')
    .get(authenticate.verifyUser,(req,res,next)=>{
        Sessions.find({userId:req.user._id}).then(data=>{
            res.statusCode=200;
            res.setHeader('ContentType','application/json');
            res.json(data);
        })
    });

module.exports = SessionRouter;