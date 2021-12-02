const mongoose = require('mongoose');
const cart = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    cardNumber:{
        type:String,
        required:true,
        unique:true,
        minlength:16,
        maxlength:16
    },
    cardName:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50,
    },
    expiryDate:{
        type:Date,
        required:true,
    }
});
module.exports = mongoose.model("PayDetails",cart);