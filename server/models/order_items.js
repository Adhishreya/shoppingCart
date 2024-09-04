const mongoose = require("mongoose");
const Shipping = require("./shipping");
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
  shipping_details: {
    type: mongoose.Types.ObjectId,
    ref: "Shipping",
    default:null
  },
});

order_items.pre("insertMany", async function (next, docs) {
  const orders = docs.map(async (order) => {
    return await new Promise((resolve, reject) => {
      Shipping.create({
        shipmentDate: new Date(),
        estimatedArrival: new Date(),
        shipmentMethod: "",
      }).then((result) => {
        order._doc.shipping_details = result._id;
        resolve(order);
      });
    });
  });

  docs = await Promise.all(orders);
  next();
});
module.exports = mongoose.model("Order_items", order_items);
