const mongoose = require("mongoose");
const {
  CartItem,
  Order_items,
  Orders,
  Payment,
  Sessions,
  User,
  Products,
} = require("../models");

const { createError } = require("../error");

const getOrder = async (req, res, next) => {
  try {
    const orders = await Orders.find({ userId: req.user.id }).populate(
      "orderSummary"
    );
    res.statusCode = 200;
    res.setHeader("ContentType", "appliation/json");
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrderItems = async (req, res, next) => {
  try {
    const orderDetails = await Order_items.find({
      status: "Pending",
    }).populate("productId", "productName _id averageRating images");
    let order_item = orderDetails.map((item) => {
      let { quantity, cost } = item;
      let { images, productName, averageRating, _id } = item.productId;
      return {
        image: images[0],
        productName,
        quantity,
        averageRating,
        cost,
        _id: item._id,
      };
    });

    res.statusCode = 200;
    res.setHeader("ContentType", "appliation/json");
    res.json(order_item);
  } catch (error) {
    next(error);
  }
};

const checkout = async (req, res, next) => {
  try {
    let { paymentMode, provider } = req.body;
    const session = await Sessions.findOne({ userId: req.user._id }, "total");
    const doc = new Orders({ userId: req.user._id, total: session.total });

    await Payment.create({
      orderId: mongoose.Types.ObjectId(doc._id),
      amount: session.total,
      paymentMode: paymentMode,
      provider: provider,
    });

    const cartItems = await CartItem.find({ sessionId: session._id });
    const insertedItems = await Order_items.insertMany(cartItems);
    const orderSummary = insertedItems.map((items) => items._id);

    doc.orderSummary = [...orderSummary];

    await new Order_items().save();

    await doc.save();

    await Sessions.findByIdAndUpdate(
      { _id: session._id },
      { $set: { total: 0 } }
    );

    await CartItem.deleteMany({ sessionId: session._id });

    res.statusCode = 200;
    res.setHeader("ContentType", "appliation/json");
    res.json("createdOrder");
  } catch (error) {
    next(error);
  }
};

const returenedOrders = async (req, res, next) => {};

const cancelledOrders = async (req, res, next) => {};

module.exports = {
  getOrder,
  getOrderItems,
  checkout,
  cancelledOrders,
  returenedOrders,
};
