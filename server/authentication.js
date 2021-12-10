//strategies are used by passport for authentications
const passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/user');
const jwt = require('jsonwebtoken');//create ,sign and verify tokens
const config = require('./config');
passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    Users.findById(id,(err,user)=>{
        done(err,user);
    });
});

exports.getTokens = (user)=>{
    return jwt.sign(user,config.secretKey,{expiresIn:3600});
}
// exports.authenticate= passport.use(new LocalStrategy((username,password,done)=>{
//     //verify credentials callback
//         Users.findOne({username:username},(err,user)=>{
//             if(err){
//                 //server error 
//                 return done(err);
//             }
//             if(!user || !user.authenticate(password)){
//                 console.log('invalid')
//                 return (null,false,{message:'Invalid username or password'})
//             }

//             return done(null,user);
//     })
//     }
// ));

exports.verifyAdmin= (req,res,next) => {
     if(req.user.admin == true){
         next()
     }
     else{
         res.setCode = 500;
         next(err);
     }
}