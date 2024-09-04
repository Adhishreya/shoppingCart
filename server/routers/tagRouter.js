const {Tags} = require('../models');
const TagRouter = require('express').Router();
const authenticate = require('../authentication');

TagRouter.route('/')
    .get((req, res) => {
        Tags.find({}).then(data => {
            res.statusCode = 200;
            res.header('ContentType', 'application/json');
            res.json(data);
        })
    })
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        let tagNAme = req.body.name;
        Tags.create({ tagNAme }).then(data => {
            res.statusCode = 200;
            res.header('ContentType', 'application/json');
            res.json(data);
        }, err => next(err));
    })


module.exports = TagRouter;