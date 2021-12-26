const mongoose = require('mongoose');
const cart = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    cardNumber: {
        type: String,
        required: true,
        unique: true,
        minlength: 16,
        maxlength: 16,
        validate: {
            validator: function (v) {
                return /[0-9]{16}$/.test(v);
            },
            message: '{VALUE} is not a valid card number'
        }
    },
    cardName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    expiryMonth: {
        type: Number,
        required: true,
        // validate: {
        //     validator: function (v) {
        //         return /^(0[1-9]|1[0-2])\/\d{2}$/.test(v);
        //     }
        // }
    },
    expiryYear: {
        type: Number,
        required: true,
        // validate: {
        //     validator: function (v) {
        //         return /^(0[1-9]|1[0-2])\/\d{2}$/.test(v);
        //     }
        // }
    }
});
module.exports = mongoose.model("PayDetails", cart);