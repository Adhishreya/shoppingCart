const mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.Currency;
const Reviews = require('../models/reviews');
const Tags = require('../models/tags');
const Discount = require('../models/discount');
const Session = require('../models/session');

const products = new mongoose.Schema({
    productName: {
        type: String,
        index: true
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
    // reviews: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: Reviews
    //     }
    // ],
    colours: [{
        type: String
    }],
    sizes: [{ type: String }],
    averageRating: {
        default: 0,
        type: Number
    },
    discount: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount'
        // type:mongoose.Schema.Types.Number,
        // default:0
    }],
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: Tags
    }]
});
products.methods.updateAvailability = function (id, number, next,sessionId,total) {
    // product._id, -1, next,session[0]._id,session[0].tota
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
            Discount.find({ _id: doc.discount[0] }).then(
                disocunt => {
                    // Session.calculteTotal(sessionId,doc.price,disocunt[0].value,number,next)
                    Session.findById(sessionId).then(
                        session=>session.calculteTotal(sessionId,doc.price,disocunt[0].value,number,next,total)
                    )
                    // Session.findByIdAndUpdate({ userId: req.user.id },{
                    //     $set:{
                    //         total:()=>{
                    //             let discountedPrice = 
                    //         }
                    //     }
                    // })
                }
            )
            // return doc;
        }
    }).clone();
}

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
module.exports = mongoose.model("Products", products);