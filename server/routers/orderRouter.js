var orderRouter = require("express").Router();
var authenticate = require("../authentication");

const {
  getOrder,
  getOrderItems,
  checkout,
  cancelledOrders,
  returnedOrders,
  cancelOrders,
  getDeliveredItems,
  returnOrder
} = require("../controller/orderController");

orderRouter.route("/").get(authenticate.verifyUser, getOrder);

orderRouter.route("/items").get(authenticate.verifyUser, getOrderItems);

orderRouter.route("/checkout").post(authenticate.verifyUser, checkout);

orderRouter.route("/cancelled").get(authenticate.verifyUser, cancelledOrders);

orderRouter.route("/cancel/:id").post(authenticate.verifyUser, cancelOrders);

orderRouter.route("/delivered").get(authenticate.verifyUser, getDeliveredItems);

orderRouter.route("/returned").get(authenticate.verifyUser, returnedOrders);

orderRouter.route("/return/:id").post(authenticate.verifyUser, returnOrder);

module.exports = orderRouter;
