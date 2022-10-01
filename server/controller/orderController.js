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
    res.setHeader("ContentType", "application/json");
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
    res.setHeader("ContentType", "application/json");
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

    await doc.save();

    await Sessions.findByIdAndUpdate(
      { _id: session._id },
      { $set: { total: 0 } }
    );

    await CartItem.deleteMany({ sessionId: session._id });

    res.statusCode = 200;
    res.setHeader("ContentType", "application/json");
    res.json({ data: "createdOrder" });
  } catch (error) {
    next(error);
  }
};

const getDeliveredItems = async (req, res, next) => {
  try {
    const orderDetails = await Order_items.find({
      status: "Delivered",
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
    res.setHeader("ContentType", "application/json");
    res.json(order_item);
  } catch (error) {
    next(error);
  }
};

const returnedOrders = async (req, res, next) => {
  try {
    const orderDetails = await Order_items.find({
      status: "Returned",
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
    res.setHeader("ContentType", "application/json");
    res.json(order_item);
  } catch (error) {
    next(error);
  }
};

const cancelledOrders = async (req, res, next) => {
  try {
    const orderDetails = await Order_items.find({
      status: "Cancelled",
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
    res.setHeader("Content-Type", "application/json");
    res.json(order_item);
  } catch (error) {
    next(error);
  }
};

const cancelOrders = async (req, res, next) => {
  let id = req.params.id;

  try {
    await Order_items.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: "Cancelled",
        },
      },
      (err, doc) => {
        if (err) next(err);
        else {
          res.statusCode = 200;
          // res.setHeader("Content-Type", "application/json");
          res.json({ data: "Order returned" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

const returnOrder = async (req, res, next) => {
  let id = req.params.id;

  try {
    await Order_items.findByIdAndUpdate(
      id,
      {
        $set: {
          status: "Returned",
        },
      },
      (err, _) => {
        if (err) next(err);
        else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ data: "Order returned" });
        }
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOrder,
  getOrderItems,
  checkout,
  cancelOrders,
  getDeliveredItems,
  returnOrder,
  returnedOrders,
  cancelledOrders,
};
