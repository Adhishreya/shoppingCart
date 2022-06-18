const mongoose = require('mongoose');
const reviews = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true,
                
    },
    rating:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    }
});
module.exports = mongoose.model("Reviews",reviews);