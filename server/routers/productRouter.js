const productsRouter = require('express').Router();
const Products = require('../models/products');
const passport = require('passport');
const authenticate = require('../authentication');
productsRouter.route('/')
    .get((req, res) => {
        Products.find({}).populate('vendorDetails','companyName').then((data) => {
            // .populate('vendorDetails').populate('discount').populate('reviews.userId').then((data)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);


        }).catch(e => console.log('unsuccessful'))
    })
    .post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
        let {productName,description,sku,images,price,vendorDetails,availability}  = req.body;
        Products.create({productName,description,sku,images,price,vendorDetails,availability}).then((data)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(e => next(e));
    });
productsRouter.route('/updateInventory/:productId')
.put((authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    let productId = req.params.productId;
    let {availability} = req.body;
    console.log(availability);
    Products.findByIdAndUpdate(productId,{$set:{availability}}).then((data)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }).catch(e => next(e));
})
);

productsRouter.route('/:productId')
.delete((authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    let productId = req.params.productId;
    Products.findByIdAndDelete(productId).then((data)=>{
        res.sendStatus(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    }).catch(e => next(e));
}))
module.exports = productsRouter;
