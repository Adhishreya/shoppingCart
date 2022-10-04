const ReviewRouter = require("express").Router();
const Reviews = require("../models/reviews");
const authenticate = require("../authentication");
const { Products } = require("../models");

ReviewRouter.route("/:id").post(
  authenticate.verifyUser,
  async (req, res, next) => {
    let prod_id = req.params.id;
    let user_id = req.user.id;

    let { title, body, rating } = req.body;

    try {
      const review = new Reviews({
        title,
        body,
        productId: prod_id,
        userId: user_id,
        rating,
      });

      let product_item = await Products.findById(prod_id);
      // let avgRating = (product_item.averageRating + review.rating) / 2;

      // product_item.averageRating = avgRating;

      // await product_item.save();
      // // Products.findByIdAndUpdate({ _id: prod_id }, { $set: {
      //     // averageRating :
      //  // } });

      review.save().then((result) => {
        product_item
          .updateRating(product_item._id, review.rating, review._id)
          .then(() => {
            res.statusCode = 201;
            res.setHeader("Content-Type", "application/json");
            res.json(result);
          });
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = ReviewRouter;
