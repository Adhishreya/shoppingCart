const express = require('express');
const CardRouter = express.Router();
const Products = require('../models/products');
const mongoose = require('mongoose');
const {Cart,CartItem} = require('../models/cart_item');
CardRouter.route('/')
.get((req,res,next)=>{
    Cart.find({}).populate('products').then(data=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(data);
            })
           
})
.post((req,res,next)=>{

    console.log(req.body);
    
    Cart.create({userId:req.body.user}).then(data=>{res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(data);
    },err=>next(err)).catch(e=>console.log(e));
}) 

CardRouter.route('/:id')
.post((req,res,next)=>{
    let id = req.params.id;
    let {user,quantity} = req.body;
    var cartItem ;
console.log(id);
    Products.findById({_id:id},(err,product)=>{
        if(err)
        {
            console.log(err);
        }
        console.log(quantity==undefined);
        if(quantity==undefined){
            quantity = 1;
        }
        // number = quantity
        product.updateAvailability(id,quantity,next).then(()=>{
            CartItem.create({productId:id,quantity:quantity},(err,doc)=>{
                if(err){
                    next(err);
        
                }
                else{
                    cartItem = doc;
        
        
                    
                    Cart.findOne({userId:user},(err,docs)=>{
                        if(err){
                            next(err);
                        }
                        else{
                            docs.products.push(cartItem);
                            docs.save();
                            res.statusCode = 200;
                            res.setHeader('Content-Type','application/json');
                            res.json(docs);
                        }
                    })
        
            }
            
        })
            
        })
    }
        
            )
    
})
.delete((req,res)=>{
    let {cartId} = req.body;
    Cart.findByIdAndUpdate({_id:cartId},{
        $pull:{
            products:mongoose.Types.ObjectId(req.params.id)
        }
    }
        ).then(()=>{
            CartItem.findByIdAndDelete({_id:req.params.id}).then(data=>{
                console.log(data);
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(data);
            })
        })
})


CardRouter.route('/increment')       
.patch((req,res,next)=>{
    let {orderId} = req.body;
    CartItem.findById({_id:orderId},(err,doc)=>{
        if(err){
            next(err);
        }
        else{
            doc.increment(doc._id);
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(doc);
        }
    });

});

CardRouter.route('/decrement')       
.patch((req,res,next)=>{
    let {orderId} = req.body;
        CartItem.findById({_id:orderId},(err,doc)=>{
            if(err){
                next(err);
            }
            else{
                doc.decrement(doc._id);
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(doc);
            }
        });
          
    });
module.exports = CardRouter;