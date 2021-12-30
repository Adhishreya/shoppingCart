const mongoose = require('mongoose');
const payment = new mongoose.Schema({
    gatewayName:{
        type:String
    },
    paymentStatus:{
        type:String,
        enum: { values:['Pending','Success','Failed']},
        default:'Pending'
    },
    amount:{
        type:Number
    },
    paymentMode: {
        type: String,
        enum: { values: ['COD', 'Debit Card', 'Wallet'] }
    }
});
module.exports = mongoose.model("Payment",payment);