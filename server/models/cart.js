const mongoose = require('mongoose');
const cart = new mongoose.Schema({
    // cartItemId:{
    //     unique:true,
    //     type:mongoose.Schema.Types.ObjectId
    // },

    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Products'
    },
    // quantity:{
        
    // }
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    sessionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Sessions'
    }


});
module.exports = mongoose.model("Cart",cart);