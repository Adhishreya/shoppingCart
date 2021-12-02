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
        min:0
    },
    reviews:[Reviews],
    averageRating:{
       default:0,
       type:Number 
    },
    quantity:{
        type:Number,
        min:0,
    },
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

module.exports = mongoose.model("Products",products);