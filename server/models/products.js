const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.Currency;
const Reviews = require('../models/reviews');
const Tags = require('../models/tags');
// const imageSchema = new mongoose.Schema({
//     // data: Buffer,
//     // contentType: String
//     type: String
// });

const products = new mongoose.Schema({
    productName: {
        type: String
    },
    description: {
        type: String,
        require: true
    },
    sku: {
        type: String,
        unique: true
    },
    images: [{ type: String }],
    price: {
        type: currency,
    },
    vendorDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vendor'
    }],
    availability: {
        type: Number,
        min: 0,
        validate: (value) => {
            if (value < this.availability) {
                throw new Error('Invalid availability');
            }
        }
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: Reviews
        }
    ],
    colours: [{
        type: String
    }],
    averageRating: {
        default: 0,
        type: Number
    },
    discount: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'Discount'
        type:mongoose.Schema.Types.Number,
        default:0
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Tags
    }]
});
products.methods.updateAvailability = function (id, number, next) {
    console.log("inside number" + number);
    return this.model(this.constructor.modelName, this.schema).findByIdAndUpdate({ _id: id }, {
        $set: {
            availability: this.availability + number
        }
    }, { new: true, runValidators: true }, (err, doc) => {
        if (err) {
            console.log(err);
            next(err);
        }
        else {
            console.log(doc);
        }
    }).clone();
}
module.exports = mongoose.model("Products", products);