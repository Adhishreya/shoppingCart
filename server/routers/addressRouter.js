const AddressRouter = require('express').Router();
const Address = require('../models/user_address');
const Users = require('../models/user');
const authenticate = require('../authentication');

AddressRouter.route('/')
    .get(authenticate.verifyUser, (req, res) => {
        Address.find({ u_id: req.user.id }).then(data => {
            res.statusCode = 200;
            res.setHeader('ContentType', "applciation/json");
            res.json(data);
        }, err => next(err))
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        const  u_id  = req.user.id;
        const { addressLine1, addressLine2, city, post_code, country,country_code } = req.body;
        let telephone = '';
        let mobile = '';
        if (req.body.telephone)
            telephone = req.body.telephone;
        if (req.body.mobile)
            mobile = req.body.mobile;
        Address.create({ u_id, addressLine1, addressLine2, city, post_code, country, telephone, mobile,country_code }).then((address) => {
            Users.findByIdAndUpdate( { _id:u_id }, { $push: { address: address } }, (err, user) => {
                if (err) {
                    next(err);
                }
                else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);
                }
            })
        })
    });
AddressRouter.route('/:id')
    .post(authenticate.verifyUser, (req, res) => {
        const { id } = req.params;
        Address.findByIdAndUpdate({ _id: id }, { $set: req.body }).then(data => {
            res.statusCode = 200;
            res.setHeader('ContentType', 'application/json');
            res.json(data);
        })
    })
    .delete(authenticate.verifyUser, (req, res) => {
        const { id } = req.params;
        Address.findByIdAndDelete({ _id: id }, { $pull: id }).then(data => {
            res.statusCode = 200;
            res.setHeader('ContentType', 'application/json');
            res.json(data);
        })
    })


module.exports = AddressRouter;