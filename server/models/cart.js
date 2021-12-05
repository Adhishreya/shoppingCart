const mongoose = require('mongoose');


const cartItemsSchema = new mongoose.Schema({
    productId: {    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        required: true,
    }});


    cartItemsSchema.methods.increment = function(id){
        return this.model(this.constructor.modelName, this.schema).findByIdAndUpdate({_id:id},{
            $set:{
                quantity:this.quantity + 1,
            }
        },{new:true,runValidators:true},
        (err,doc)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(doc);
            }
            }).clone();
    } 

    cartItemsSchema.methods.decrement = function(id){
        return this.model(this.constructor.modelName, this.schema).findByIdAndUpdate({_id:id},{
            $set:{
                quantity:this.quantity - 1,
            }
        },{new:true,runValidators:true},
        (err,doc)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(doc);
            }
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
    products :[{type:mongoose.Schema.Types.ObjectId, ref : 'CartItem'}],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    sessionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Sessions'
    }


});
// module.exports = mongoose.model("Cart",cart);

const Cart = mongoose.model('Cart',cart);
const CartItem = mongoose.model('CartItem',cartItemsSchema);
module.exports = {Cart,CartItem};