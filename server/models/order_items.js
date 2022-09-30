const mongoose = require("mongoose");
const order_items = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Products",
  },
  quantity: {
    type: Number,
  },
  status: {
    default: "Pending",
    type: String,
    enum: { values: ["Delivered", "Pending", "Cancelled", "Returned"] },
  },
  cost: {
    type: Number,
    required: true,
    default: 0,
  },
});
module.exports = mongoose.model("Order_items", order_items);
