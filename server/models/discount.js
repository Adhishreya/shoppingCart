const mongoose = require('mongoose');
const discount = new mongoose.Schema({
    
    discount_name: {
        type: String,
        required: true
    },
    discount_type: {
        type: String,
        required: true
    },
    discount_value: {
        type: Number,
        required: true
    },
    discount_start_date: {
        type: Date,
        required: true
    },
    discount_end_date: {

        type: Date,
        required: true
    }
    // ,
    // discount_status: {
    //     type: String,
    //     required: true
    // },
});
module.exports = mongoose.Schema("Discount",discount);