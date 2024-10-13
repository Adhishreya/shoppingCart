const mongoose = require("mongoose");
// const Products = require("./products");

const reviews = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  images: {
    type: [String],
  },
});

// reviews.post("save", function (doc) {
// Products.findOne({ _id: doc.productId }).exec();
//   let products = Products.findOne({_id:doc.productId});
// Products.find({_id:doc.productId})
//   let avgRating = (products.averageRating + doc.rating) / 2;
//   products.averageRating = avgRating;
//   await products.save();
// });
module.exports = mongoose.model("Reviews", reviews);
