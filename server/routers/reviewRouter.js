const ReviewRouter = require("express").Router();
const Reviews = require("../models/reviews");
const authenticate = require("../authentication");
const { Products } = require("../models");
const { RootNodesUnavailableError } = require("redis");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// authenticate.verifyUser

const upload = multer();

const createReview = async (
  res,
  title,
  body,
  prod_id,
  user_id,
  rating,
  next,
  image
) => {
  try {
    const review = new Reviews({
      title,
      body,
      productId: prod_id,
      userId: user_id,
      rating,
      ...(image && { images: [image] }),
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
};

ReviewRouter.route("/:id")
  .get(async (req, res, next) => {
    const id = req.params.id;

    try {
      const review = await Reviews.find({ productId: Object(id) }).populate(
        "userId"
      );
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(review);
    } catch (error) {
      next(error);
    }
  })
  .post(
    authenticate.verifyUser,
    upload.single("file"),
    async (req, res, next) => {
      let prod_id = req.params.id;
      let user_id = req.user.id;

      console.log("value check", req.body, req.title);
      let { title, details: body, rating, imageDetails } = req.body;
      // const title = String(req.title);
      // const body = String(req.details);
      // const rating = Number(req.rating || 0);

      console.log("imageDetails", req.file.buffer);

      if (req.file) {
        // cloudinary.uploader.unsigned_upload_stream
        await cloudinary.uploader
          .upload_stream((err, result) => {
            if (err) {
              console.log("triggered", err);
              // next(err);
              createReview(
                res,
                title,
                body,
                prod_id,
                user_id,
                rating,
                next,
                null
              );
            } else {
              createReview(
                res,
                title,
                body,
                prod_id,
                user_id,
                rating,
                next,
                result.secure_url
              );
            }
          })
          .end(req.file.buffer);
      } else {
        createReview(res, title, body, prod_id, user_id, rating, next, null);
      }
    }
  );

module.exports = ReviewRouter;
