const mongoose = require("mongoose");
require("mongoose-currency").loadType(mongoose);
const currency = mongoose.Types.Currency;
const Reviews = require("../models/reviews");
const Tags = require("../models/tags");
const Discount = require("../models/discount");
const Session = require("../models/session");
const { result } = require("lodash");

const products = new mongoose.Schema({
  productName: {
    type: String,
    index: true,
  },
  description: {
    type: String,
    require: true,
  },
  sku: {
    type: String,
    unique: true,
  },
  images: [{ type: String }],
  price: {
    type: currency,
  },
  vendorDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ],
  availability: {
    type: Number,
    min: 0,
    validate: (value) => {
      if (value < this.availability) {
        throw new Error("Invalid availability");
      }
    },
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Reviews,
    },
  ],
  colours: [
    {
      type: String,
    },
  ],
  sizes: [{ type: String }],
  averageRating: {
    default: 0,
    type: Number,
  },
  discount: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
      // type:mongoose.Schema.Types.Number,
      // default:0
    },
  ],
  category: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tags,
    },
  ],
});
products.methods.updateAvailability = async function (
  id,
  number,
  next,
  sessionId,
  total
) {
  let doc = await this.model(
    this.constructor.modelName,
    this.schema
  ).findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        availability: this.availability + number,
      },
    },
    { new: true, runValidators: true }
  );

  let disocunt = await Discount.find({ _id: doc.discount[0] });

  let discountedPrice =
    -(doc.price / 100) * (1 - disocunt[0].value / 100) * number + total;

  return await Session.findById(sessionId).then((session) => {
    session.calculteTotal(sessionId, discountedPrice, next);
    return discountedPrice - total;
  });
};

// products.methods.calculateTotal = function (id,next){
//     // {((product.price) / 100) * (1 - (product.discount[0].value / 100))}
//     // let discountedPrice = prod
//     return this.model(this.constructor.modelName,this.schema).findByIdAndUpdate({_id:id},'discount',{
//         $set:{price:()=>{
//             Discount.findById
//         }}

//     })
// }

// products.createIndex({name:"text",description:"text"})

products.methods.updateRating = async function (id, rating, rating_id) {
  // let product_item = await this.model(
  //   this.constructor.modelName,
  //   this.schema
  // ).findById(id);
  // product_item.averageRating = avgRating;
  // product_item.reviews.push(rating_id);
  // return product_item.save();
  // return this.model(this.constructor.modelName, this.schema).findById(
  //   id,
  //   (err, doc) => {
  //     // console.log(doc);
  //     if (doc) {
  //       let avgRating = (doc.averageRating + rating) / 2;
  //       doc.averageRating = avgRating;
  //       doc.reviews.push(rating_id);
  //       doc.save().then((res) => {
  //         return res;
  //       });
  //     }
  //   },
  // );

  await this.model(this.constructor.modelName, this.schema).findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        averageRating: (rating + this.averageRating) / 2,
      },
      $push: { reviews: rating_id },
    }
  );
};

module.exports = mongoose.model("Products", products);
