const mongoose = require('mongoose');
const vendor = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    licensedVendor:{
        type:Boolean,
        require:true
    }
});
module.exports = mongoose.model("Vendor",vendor);