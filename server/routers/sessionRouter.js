const SessionRouter = require('express').Router();
const {Sessions,CartItem} = require('../models');
const authenticate = require('../authentication');

SessionRouter.route('/')
    .get(authenticate.verifyUser,(req,res,next)=>{
        Sessions.find({userId:req.user._id}).then(data=>{
            res.statusCode=200;
            res.setHeader('ContentType','application/json');
            res.json(data);
        })
    })
    .post(authenticate.verifyUser,(req,res,next)=>{
        // Session
    } )
module.exports = SessionRouter;