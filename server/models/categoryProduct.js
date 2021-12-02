const mongoose = require('mongoose');
const categoriesProduct = new mongoose.Schema({
  catgoryProducs: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'categories',
    required:true,
    },
    product:[Products]
});
module.exports = mongoose.Schema("CategoryProducts",categoriesProduct);