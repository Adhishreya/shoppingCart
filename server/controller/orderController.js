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
    let id = req.params.id;
    // const orderDetails  = await Orders.findById(id).populate('orderSummary');
    // orderDetails.orderSummary.populate('productId');
    const orderDetails = await Orders.findById(id).populate({
      path: "orderSummary",
      populate: { path: "productId" },
    });

    const { status, total } = orderDetails;

    let order_item = orderDetails.orderSummary.map((item) => {
      let quantity = item.quantity;
      let { images, productName, averageRating, _id } = item.productId;
      return { image: images[0], productName, quantity, averageRating, _id };
    });

    // const order_item

    // let orderItems = [];

    // orderSummary.map(async (items)=>{
    //     const orderItem = await Order_items.findById(items).populate('productId');

    // const {productName,images} =  orderItem.productId;

    // const order_item = {productName,images:images[0],quantity : orderItem.quantity};

    // orderItems.push(order_item);
    // });

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
    const orderSummary = insertedItems.map(items => items._id);

    doc.orderSummary = [...orderSummary];

    await doc.save();

    await CartItem.deleteMany({sessionId: session._id})

    res.statusCode = 200;
    res.setHeader("ContentType", "appliation/json");
    res.json("createdOrder");
  } catch (error) {
    next(error);
  }
};

module.exports = { getOrder, getOrderItems, checkout };
