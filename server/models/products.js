const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.Currency;
const Reviews = require('../models/reviews');
const Tags = require('../models/tags');
const imageSchema = new mongoose.Schema({
    // data: Buffer,
    // contentType: String
    type:String
});

const products = new mongoose.Schema({
    // productId:{
    //     unique:true,
    //     type:mongoose.Schema.Types.ObjectId
    // },
    productName:{
        type:String
    },
    description:{
        type:String,
        require
    },
    sku:{
        type:String,
        unique:true
    },
    images:{
        type:[imageSchema]
    },
    price:{
        type:currency,
    },
    vendorDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor'
    },
    availability:{
        type:Number,
        min:0,
        validate:(value)=>{ 
            if(value<this.quantity){
                throw new Error('Invalid availability');
            }
        }
    },
    reviews:[Reviews],
    averageRating:{
       default:0,
       type:Number 
    },
    // quantity:{
    //     type:Number,
    //     min:0,
    // },
    discount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Discount'
    },
    // category:{
    //     type:String,
    //     require:true
    // },
    tags:[Tags]

});
product.methods.updateAvailability = function(id,number,next){
    console.log("inside number"+number);
    return this.model(this.constructor.modelName, this.schema).findByIdAndUpdate({_id:id},{
        $set:{
            availability:this.availability + number
        }
    },{new:true,runValidators:true},(err,doc)=>{
        if(err){
            console.log(err);
            next(err);
        }
        else{
            console.log(doc);
        }
        }).clone();
}
module.exports = mongoose.model("Products",products);