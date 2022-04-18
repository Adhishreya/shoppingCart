let Tags = require('../models/tags');
const TagRouter = require('express').Router();

TagRouter.route('/')
    .get((req,res)=>{
        Tags.find({}).then(data=>{
            res.statusCode=200;
            res.header('ContentType','application/json');
            res.json(data);
        })
    });


module.exports = TagRouter;