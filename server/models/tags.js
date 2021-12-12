const mongoose = require('mongoose');
const tags = new mongoose.Schema({
    tagNAme: {
        type: String,
        enum: { values: ['New', 'Renewed', 'Used', 'Refurbished', 'Unspecified'] },
        required: true
    }
});
module.exports = mongoose.model("Tags", tags);