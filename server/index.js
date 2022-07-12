const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const createError = require('http-errors');
const app = express();
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config');
const port = process.env.PORT || 5000;
const Users = require('./models/user');
app.use(bodyParser.urlencoded({ extended: false }));
var flash = require('connect-flash');
require('dotenv').config();
const session = require('express-session')
// app.use(session({ secret: config['secret-key'] }));
const passport = require('passport');

const apicache = require('apicache');
const cache = apicache.middleware;

const { userRouter,
  vendorRouter,
  productsRouter,
  CartRouter,
  UserPaymentRouter,
  paymentRouter,
  orderRouter,
  TagRouter,
  DiscountRouter,
  addressRouter,
  categoryRouter } = require('./routers')

app.use(cache('5 minutes'));
app.use(passport.initialize());
app.use(cors());
app.use(bodyParser.json());
app.use(flash());

mongoose.connect(
  process.env.MONGO_URL,
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
app.use('/address', addressRouter);
app.use('/vendor', vendorRouter);
app.use('/products', productsRouter);
app.use('/cart', CartRouter);
app.use('/categories', categoryRouter);
// app.use('/saveCard', CardRouter); 
app.use('/payment/methods', UserPaymentRouter);
app.use('/orders', orderRouter);
app.use('/tags', TagRouter);
app.use('/discount', DiscountRouter);
app.use('/status', paymentRouter);
app.use(function (err, req, res, next) {
  if (err) {
    // res.sendCode(500);
    console.log(err);
    // res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.send('unable to perform operation' + err)
  }
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

module.exports = app;