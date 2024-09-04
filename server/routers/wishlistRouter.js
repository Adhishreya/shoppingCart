const { WishList } = require("../models");
const authenticate = require("../authentication");
const {
  fetchWishLists,
  addWishList,
  checkWishList,
  deleteWishList
} = require("../controller/wish-listController");
const WishListRouter = require("express").Router();

WishListRouter.route("/").get(authenticate.verifyUser, fetchWishLists);
WishListRouter.route("/:id")
  .get(authenticate.verifyUser, checkWishList)
  .post(authenticate.verifyUser, addWishList)
  .delete(authenticate.verifyUser,deleteWishList);
module.exports = WishListRouter;
