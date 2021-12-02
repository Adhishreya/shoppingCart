const mongoose = require('mongoose');
const sessionData = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    
    },
    total:{
        type: Number,
        required: true
    },
    timestamp
});
module.exports = mongoose.Schema("Sessions",sessionData);