const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.Currency;

const order = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    orderSummary: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order_items'
        }
    ],
    status: {
        type: String,
        enum: { values: ['Delivered', 'Pending','Cancelled','Returned'] },
        default: 'Pending'
        // enum: { values: ['Delivered', 'Cancelled', 'Failed', 'Pending', 'Declined', 'Rejected', 'Success'] }
    },
    total: {
        type: currency
    },
    tax: {
        type: Number,
        default: 0
    },
    // itemCount: {
    //     type: Number
    // },  // no of items in the cart
    shippingAddress: {
        type: mongoose.Types.ObjectId,
        ref:"Address"
    },
    paymentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    paymentDate: {
        type: Date
    },
    shippingCost: {
        type: currency
    },

}, { timestamps: true });
module.exports = mongoose.model("Orders", order);