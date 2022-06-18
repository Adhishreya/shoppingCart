const mongoose = require('mongoose');
const currency = mongoose.Types.Currency;

const payment = new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Orders'
    },
    gatewayName:{
        type:String
    },
    paymentStatus:{
        type:String,
        enum: { values:['Pending','Success','Failed']},
        default:'Pending'
    },
    amount:{
        type:currency
    },
    paymentMode: {
        type: String,
        enum: { values: ['COD', 'Debit Card', 'Wallet'] }
    },
    provider:{
        type:String
    }
});
module.exports = mongoose.model("Payment",payment);