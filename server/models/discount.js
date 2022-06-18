const mongoose = require('mongoose');

const discounts = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    value:{
        type:Number
    },
    active:{
        type:Boolean,
        default:true
    },
    discountStartDate:{
        type:Date,
        default:new Date()
    },
    discountEndDate:{
        type:Date
    }
});
module.exports = mongoose.model("Discount", discounts);