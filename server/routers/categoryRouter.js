const categoryRouter = require('express').Router();
const Category = require('../models/categories');
const passport = require('passport');
const authenticate = require('../authentication');
categoryRouter.route('/')
.get((req, res) => {
    Category.find({}, (err, categories) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(categories);
        }
    });
})
.post(authenticate.verifyUser, (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(category);
        }
    });
});
module.exports = categoryRouter;