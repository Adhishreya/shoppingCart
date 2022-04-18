const mongoose = require('mongoose');

const discounts = new mongoose.Schema({
    value: {
        type:Number
    }
});
module.exports = mongoose.model("Discount", discounts);