const mongoose = require("mongoose");

const address = new mongoose.Schema({
    u_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    addressLine1: {
        type: String,
    },
    addressLine2:
    {
        type: String,
    },
    city: {
        type: String,
    },
    post_code: {
        type: String,
    },
    country: {
        type: String,
    },
    // telephone: {
    //     type: String,
    // },
    country_code: {
        type: String,
    },
    mobile: {
        type: String,
        unique: true,
        // validate: {
        //     validator: function (v) {
        //         // return  /\d{3}\d{3}\d{4}/.test(v);
        //         console.log(/[1-9]{1}[0-9]{9}/.test(v));
        //         return /[1-9]{1}[0-9]{9}/.test(v);
        //     },
        //     message: '{VALUE} is not a valid phone number'
        // }
    }
})
module.exports = mongoose.model("Address", address);