const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.Currency;

const order = new mongoose.Schema({
    cartId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    status:{
        type:String,
        enum:['Delivered','Cancelled', 'Failed', 'Pending', 'Declined', 'Rejected', 'Success']
    },
    total:{
        type:currency
    },
    paymentMode:{
        type:String,
        enum:['COD','Debit Card','Wallet']
    },
    tax:{
        type:Number,
        default:0
     },
    itemCount:{
        type:Number
    },  // no of items in the cart
    shippingAddress:{
        type:String
    },
    paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Payment'
    },
    paymentDate:{
        type:Date
    },
    shippingCost:{
        type:currency
    },

});
module.exports = mongoose.Schema("Orders",order);