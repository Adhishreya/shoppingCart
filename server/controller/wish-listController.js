const { WishList } = require("../models");

const fetchWishLists = async (req, res, next) => {
  try {
    let wish_list = await WishList.find({ user_id: req.user.id }).populate({
      path: "product_id",
      populate: "discount",
    });
    res.statusCode = 200;
    res.setHeader("ContentType", "application/json");
    res.json(wish_list);
  } catch (e) {
    next(e);
  }
};

const addWishList = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user_id = req.user.id;

    let wish_list = new WishList({
      product_id: id,
      user_id,
    });

    await wish_list.save();
    res.statusCode = 201;
    res.setHeader("ContentType", "application/json");
    res.json(wish_list);
  } catch (e) {
    next(e);
  }
};

const checkWishList = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user_id = req.user.id;

    let wish_list = await WishList.findOne({
      product_id: id,
      user_id: user_id,
    });

    res.statusCode = 200;
    res.setHeader("ContentType", "application/json");
    res.json(wish_list);
  } catch (e) {
    next(e);
  }
};

const deleteWishList = async (req, res, next) => {
  try {
    let id = req.params.id;
    let user_id = req.user.id;

    let wish_list = await WishList.findOneAndDelete({
      product_id: id,
      user_id: user_id,
    });

    res.statusCode = 200;
    res.setHeader("ContentType", "application/json");
    res.json(wish_list);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  fetchWishLists,
  addWishList,
  checkWishList,
  deleteWishList,
};
