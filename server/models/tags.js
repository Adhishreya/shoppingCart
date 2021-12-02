const mongoose = require('mongoose');
const tags = new mongoose.Schema({
    tagNAme:{
        type:String,
        enum:['New','Renewed','Used','Refurbished','Unspecified'],
        required:true
    }
});
module.exports = mongoose.Schema("Tags",tags);