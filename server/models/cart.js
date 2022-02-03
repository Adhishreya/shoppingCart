const mongoose = require('mongoose');


const cartItemsSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    },
    quantity: {
        type: Number,
        required: true,
        get: v => v,
        validate: (function (value) {
            if (value < 0) {
                throw new Error('Quantity cannot be negative');
            }
        })
    }
});


cartItemsSchema.methods.increment = function (id, next) {
    return this.model(this.constructor.modelName, this.schema).findByIdAndUpdate({ _id: id }, {
        $set: {
            quantity: this.quantity + 1,
        }
    }, { new: true, runValidators: true },
        (err, doc) => {
            if (err) {
                console.log(err);
                next(err);
            }
        }).clone();
}


cartItemsSchema.methods.decrement = function (id, next) {
    return this.model(this.constructor.modelName, this.schema).findByIdAndUpdate({ _id: id }, {
        $set: {
            quantity: this.quantity - 1,
        }
    }, { new: true, runValidators: true },
        (err, doc) => {
            if (err) {
                next(err);
            }
            // else {
            //     Products.findById(doc.productId, (err, product) => {
            //         if (err) {
            //             console.log(err);
            //         }
            //         else {
            //             product.updateAvailability(product._id, +1, next);
            //         }
            //     })
            //     console.log(doc);
            // }
        }).clone();
}
const cart = new mongoose.Schema({
    // cartItemId:{
    //     unique:true,
    //     type:mongoose.Schema.Types.ObjectId
    // },

    // products:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Products'
    // },
    // quantity:{

    // }
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sessions'
    }


});
// module.exports = mongoose.model("Cart",cart);

const Cart = mongoose.model('Cart', cart);
const CartItem = mongoose.model('CartItem', cartItemsSchema);
module.exports = { Cart, CartItem };