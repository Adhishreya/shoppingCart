let mongoose = require("mongoose");

let shipping = new mongoose.Schema({
  shipmentDate: {
    type: Date,
  },
  estimatedArrival: {
    type: Date,
  },
  shipmentMethod: {
    type: String,
  },
});

module.exports = mongoose.model("Shipping", shipping);
