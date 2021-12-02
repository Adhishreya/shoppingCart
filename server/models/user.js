const mongoose = require('mongoose');
const Passport = require('passport-local-mongoose');
const users = new mongoose.Schema({
    // userId : {
    //     type:mongoose.Schema.Types.ObjectId,
    //     unique:true
    // },
    admin:{
        type:Boolean,
        default:false
    },
    userName:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        lowercase:true
        //,
        // validate:(value)=>{
        //     return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        // }
    },
    displayPicture : {
        type:String,
        default:null
    },
    address:[{
        type:String
    }],
    password:{
        type:String,
        require:true,
        minlength:6,
        maxlength:20,
        // select:false,
        // validate:{
        //     validator:function(value){
        //         return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,20}/.test(value);
        //     },
        //     message:'{VALUE} is not a valid password'
        // },

    },

});
users.plugin(Passport);
// ,{
//     usernameField:'email'
//});
module.exports = mongoose.model("Users",users);