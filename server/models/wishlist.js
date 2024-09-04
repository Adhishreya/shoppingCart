const mongoose = require("mongoose");

const wishlistItemsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
});


module.exports = mongoose.model("WishList",wishlistItemsSchema);