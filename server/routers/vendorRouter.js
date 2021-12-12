const vendorRouter = require('express').Router();
const Vendor = require('../models/vendor');
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('../authentication');
vendorRouter.route('/profile')
    .get(authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
        Vendor.find({}).populate('userId').then((vendor)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(vendor);
        },err=>next(err))
    })
    .post(authenticate.verifyUser, authenticate.verifyVendor, (req, res, next) => {
        let { licensedVendor, companyName, companyAddress, companyEmail, companyPhone, companyWebsite } = req.body;
        Vendor.create({ licensedVendor, companyName, companyAddress, companyEmail, companyPhone, companyWebsite, userId: mongoose.Types.ObjectId(req.user.userId) }, (err, vendor) => {
            if (err) {
                next(err);
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, vendor: vendor });
            }
        });
    });
//chacnge email and company address from the vendor id saved in the session/
module.exports = vendorRouter;