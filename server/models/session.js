const mongoose = require("mongoose");
const sessionData = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    // default : Date.now,
    // expires: '1440m'
  },
  modifiedAt: {
    type: Date,
  }
});

sessionData.methods.calculteTotal = function (id, discountedPrice, next) {
  return this.model(this.constructor.modelName, this.schema)
    .findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          total: discountedPrice,
        },
      },
      { new: true, runValudators: true },
      (err, doc) => {
        if (err) {
          console.log(err);
          next(err);
        } else {
        }
      }
    )
    .clone();
};

// sessionData.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Sessions", sessionData);
