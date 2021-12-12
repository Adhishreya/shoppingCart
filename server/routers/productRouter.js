const productsRouter = require('express').Router();
const Products = require('../models/products');
const passport = require('passport');
const authenticate = require('../authenticate');
productsRouter.route('/')
    .get((req, res) => {
        Products.find({}).then((data) => {
            // .populate('vendorDetails').populate('discount').populate('reviews.userId').then((data)=>{
            res.sendStatus(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(data);


        }).catch(e => console.log('unsuccessful'))
    })
    .post(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
        let {productName,description,sku,images,price,vendorDetails,availability,discount,tags}  = req.body;
        Products.create({productName,description,sku,images,price,vendorDetails,availability,discount,tags}).then((data)=>{
            res.sendStatus(200);
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch(e => next(e));
    });
productsRouter.route('/updateInventory/:productId')
.get((authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    let productId = req.params.productId;
    let quantity = req.body;
    Products.findByIdAndUpdate(productId,{$set:{quantity}}).then((data)=>{
        res.sendStatus(200);
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
