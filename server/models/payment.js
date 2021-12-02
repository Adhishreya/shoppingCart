const mongoose = require('mongoose');
const payment = new mongoose.Schema({
    gatewayName:{
        type:String
    },
    paymentStatus:{
        type:String,
        enum:['Pending','Success','Failed'],
        default:'Pending'
    },
    amount:{
        type:Number
    }
});
module.exports = mongoose.Schema("Payment",payment);