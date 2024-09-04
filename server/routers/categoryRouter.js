const categoryRouter = require('express').Router();
const {Category} = require('../models');
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
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
        Category.create({ categoryName: req.body.category }).then(data => {
            res.statusCode = 200;
            res.header('ContentType', 'application/json');
            res.json(data);
        }).catch(err => next(err));
    })
// .post(authenticate.verifyUser,authenticate.verifyAdmin, (req, res) => {
//     const category = new Category({categoryName:req.body});
//     category.save((err, category) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.send(category);
//         }
//     });
// });
module.exports = categoryRouter; 