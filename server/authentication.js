//strategies are used by passport for authentications
const passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
const Users = require("./models/user");
const jwt = require("jsonwebtoken"); //create ,sign and verify tokens
const vendor = require("./models/vendor");
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});

exports.getTokens = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY.toString(), {
    expiresIn: 30 * 24 * 3600,
  });
  //requesting the user to sign in after every 30 days ie here token expires after approx a month
};
exports.verifyUser = passport.authenticate("jwt", { session: false });
exports.verifyAdmin = (req, res, next) => {
  if (req.user.admin == true) {
    next();
  } else {
    var err = new Error("You are not authorized to perform this operation!");
    err.status = 403;
    next(err);
  }
};

exports.verifyVendor = (req, res, next) => {
  vendor.findOne({ vendorId: req.user.vendorId }, (err, vendor) => {
    if (err) {
      var err = new Error("You are not authorized to perform this operation!");
      err.status = 403;
      next(err);
    } else {
      next();
    }
  });
};
//     if(req.user.vendor == true){
//         next()
//     }
//     else{
//         var err = new Error('You are not registered as a vendor yet!');
//         err.status = 403;
//         next(err);
//     }
// });

exports.verifyAdmin = (req, res, next) => {
  if (req.user.admin == true) {
    next();
  } else {
    var err = new Error("You are not an admin!");
    err.status = 403;
    next(err);
  }
};

// exports.authenticate= passport.use(new LocalStrategy((username,password,done)=>{
//     //verify credentials callback
//         Users.findOne({username:username},(err,user)=>{
//             if(err){
//                 //server error
//                 return done(err);
//             }
//             if(!user || !user.authenticate(password)){
//                 return (null,false,{message:'Invalid username or password'})
//             }

//             return done(null,user);
//     })
//     }
// ));

// exports.verifyAdmin= (req,res,next) => {
//      if(req.user.admin == true){
//          next()
//      }
//      else{
//          res.setCode = 500;
//          next(err);
//      }
// }
