const commentsRouter = require('express').Router();
const Users = require('../models/user');
const reviews = require('../models/reviews');
const authenticate = require('../authentication')

commentsRouter.route('/')
    .get((req, res) => {
        reviews.find({ productId: req.query.productId }, 'userId title body rating createdAt').populate('userId').then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(e => console.log('unsuccessful'))
    })
    .post(authenticate.verifyUser, (req, res) => {
        const { title, body, rating, productId } = req.body;
        const createdAt = new Date();
        const userId = req.user._id;
        reviews.create({ title, body, rating, productId, createdAt, userId }).then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }
        ).catch(e => console.log('unsuccessful'))
    });

commentsRouter.route('/:reviewId')
    .delete(authenticate.verifyUser, authenticate.verifyVendor, (req, res, next) => {
        let reviewId = req.params.reviewId;
        reviews.findByIdAndDelete(reviewId).then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(e => next(e));
    })
module.exports = commentsRouter;