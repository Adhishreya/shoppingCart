const mongoose = require('mongoose');
const sessionData = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    
    },
    total:{
        type: Number,
        required: true,
        default: 0,
    },
    createdAt:{
        type:Date,        
    },
    modifiedAt:{
        type:Date
    }
});
module.exports = mongoose.model("Sessions",sessionData);