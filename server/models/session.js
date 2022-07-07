const mongoose = require('mongoose');
const sessionData = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    
    },
    total:{
        type: Number,
        required: true,
        default: 0,
    },
    createdAt:{
        type:Date,        
    },
    modifiedAt:{
        type:Date
    }
});


sessionData.methods.calculteTotal = function(id,price,discount,number,next,total){
    let discountedPrice = -(price/100)*(1-(discount/100))*number+total;
    return this.model(this.constructor.modelName, this.schema).findByIdAndUpdate({_id:id},{$set:{
        total:discountedPrice
    }}
    ,{new:true,runValudators:true},(err,doc)=>{
        if (err) {
            console.log(err);
            next(err);
        }
        else{
            
        }
    }).clone()
}
module.exports = mongoose.model("Sessions",sessionData);