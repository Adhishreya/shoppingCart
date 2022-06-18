const vendorRouter = require('express').Router();
const Vendor = require('../models/vendor');
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('../authentication');
vendorRouter.route('/profile')
    .get(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Vendor.find({}).populate('userId').then((vendor) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(vendor);
        }, err => next(err))
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        let { licensedVendor, companyName, companyAddress, companyEmail, companyPhone, companyWebsite } = req.body;
        Vendor.create({ licensedVendor, companyName, companyAddress, companyEmail, companyPhone, companyWebsite, userId: mongoose.Types.ObjectId(req.user.id) }, (err, vendor) => {
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

vendorRouter.route('/profile/:id')
    .get(authenticate.verifyUser,(req, res, next) => {
        Vendor.findById({ _id: req.params.id }).then((data) => {
            res.statusCode = 200;
            res.setHeader('Context-Type', 'application/json');
            res.json(data);
        }, err => next(err));
    })
//change email and company address from the vendor id saved in the session/


vendorRouter.route('/grant')
    .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        let vendor_id = req.body.vendor_id;
        Vendor.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(vendor_id) }, { $set:{approved: true }}).then(result=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, result: result });
        },err=>next(err))
        // , (err, vendor) => {
        //     if (err) {
        //         next(err);
        //     }
        //     else {
        //         res.statusCode = 200;
        //         res.setHeader('Content-Type', 'application/json');
        //         res.json( vendor );
        //     }
        // }).catch(err => next(err));
    })
vendorRouter.route('/check')
    .get(authenticate.verifyUser, (req, res,next) => {
        Vendor.find({ userId: req.user.id }, 'approved').then(data => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            if(data[0].approved){
                res.json({'status':'approved'})
            }else
            res.json({'status':'not approved'});
        },err=>next(err));
    })
module.exports = vendorRouter;