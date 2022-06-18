const mongoose = require('mongoose');
const vendor = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    licensedNumber: {
        type: String,
        require: true
    },
    companyName: {
        type: String,
        require: true
    },
    companyAddress: {
        type: String,
        require: true
    },

    companyEmail: {
        type: String,
        require: true
    },
    companyPhone: {
        type: String,
        require: true
    },
    companyWebsite: {
        type: String
        // require:true
    },
    approved: {
        type: Boolean,
        default: false
    }
});
module.exports = mongoose.model("Vendor", vendor);