const mongoose = require('mongoose');
const categories = new mongoose.Schema({
  categoryName: {
    type: String,
    enum: { values: ['Food', 'Apparel', 'Electronics', 'Home', 'Other'] },
    required: true,
    unique: true,
  }
});
module.exports = mongoose.model("Category", categories);