const express = require('express');;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config');
const port = process.env.PORT || 5000;
const Users = require('./models/user');
app.use(bodyParser.urlencoded({ extended: false }))
const userRouter = require('./routers/userRouter');
const vendorRouter = require('./routers/vendorRouter');
const productsRouter = require('./routers/productRouter');
const CartRouter = require('./routers/cartRouter');
const CardRouter = require('./routers/cardDetailsRouter');
// const categoryRouter = require('./routers/categoryRouter');
require('dotenv').config();
const session = require('express-session')
// app.use(session({ secret: config['secret-key'] }));
const paymentRouter = require('./routers/paymentsRouter');
const passport = require('passport');
const orderRouter = require('./routers/orderRouter');
app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json());

// mongoose.set('useCreateIndex', true);
mongoose.connect(
  "mongodb+srv://adhishreya:nougat%40IO2018@realmcluster.ptlvu.mongodb.net/ShoppingCart?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).catch(err => {
  console.log('unable to connect' + err)
});
const mongoSession = mongoose.startSession();

passport.use(new LocalStrategy(Users.authenticate()));
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    done(err, user);
  });
});
// app.use(passport.session({secret:config.secretKey,resave:false,saveUninitialized:false}));
// console.log(config['secret-key']);
var opts = {}
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
//extracts the jwt from the authorization header with the scheme 'bearer'
opts.secretOrKey = config.secretKey;
passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
  Users.findOne({ _id: jwt_payload._id }, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);//callback when the user is successfully found and the first parameter is the error that is assigned to null and the second parameter is the successfully obtained parameter
    }
    else {
      return done(null, false);//the error is not encountered but a new account of the specified user can be created
    }
  })
}

));

app.use('/users', userRouter);
app.use('/vendor', vendorRouter);
app.use('/products', productsRouter);
app.use('/cart', CartRouter);
app.use('/saveCard', CardRouter);
app.use('/checkout',orderRouter);
app.use('/pay',paymentRouter);
app.use(function (err, req, res, next) {
  if (err) {
    // res.sendCode(500);
    console.log(err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.send('unable to perform operation' + err)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});