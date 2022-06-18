const mongoose = require('mongoose');
const Passport = require('passport-local-mongoose');

const users = new mongoose.Schema({
    admin: {
        type: Boolean,
        default: false
    },
    vendor: {
        type: Boolean,
        default: false
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    // phoneNumber: {
    //     type: String,
    //     unique: true,
    //     validate: {
    //         validator: function (v) {
    //             // return  /\d{3}\d{3}\d{4}/.test(v);
    //             return /[1-9]{1}[0-9]{9}/.test(v);
    //         },
    //         message: '{VALUE} is not a valid phone number'
    //     }
    //     // require:true
    // },
    email: {
        type: String,
        // require:true,
        unique: true,
        lowercase: true,
        // validate:(value)=>{
        //     return /^w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        // }
        //,
        // validate:(value)=>{
        //     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        // }
    },
    displayPicture: {
        type: String,
        default: null
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    }],
    // cart: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Cart'
    //     }
    // ]
    // password:{
    //     type:String,
    //     require:true,
    //     minlength:6,
    //     maxlength:20,
    // },

});



 
users.plugin(Passport);




module.exports = mongoose.model("Users", users);