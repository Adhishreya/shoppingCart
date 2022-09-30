var orderRouter = require("express").Router();
var authenticate = require("../authentication");

const {
  getOrder,
  getOrderItems,
  checkout,
  cancelledOrders,
  returenedOrders,
} = require("../controller/orderController");

orderRouter.route("/").get(authenticate.verifyUser, getOrder);

orderRouter.route("/items/:id").get(authenticate.verifyUser, getOrderItems);

orderRouter.route("/checkout").post(authenticate.verifyUser, checkout);

orderRouter.route("/cancelled").post(authenticate.verifyUser, cancelledOrders);

orderRouter.route("/returned").post(authenticate.verifyUser, returenedOrders);

module.exports = orderRouter;
