const express = require('express');
const Router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const config = require('./config');
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: false }))
const userRouter= require('./routers/userRouter'); 
const session = require('express-session')
app.use(session({secret:config['secret-key']}));
const passport = require('passport');
// const { session } = require('passport');
app.use(cors());
app.use(bodyParser.json());

// mongoose.set('useCreateIndex', true);
mongoose.connect(
    "mongodb+srv://adhishreya:nougat%40IO2018@realmcluster.ptlvu.mongodb.net/ShoppingCart?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  ).catch(err=>{
    console.log('unable to connect'+ err)
  });
;
app.use(passport.initialize());
app.use(passport.session())
app.use('/users',userRouter);
app.use(function(err,req,res,next){
    if(err){
        // res.sendCode(500);
        res.statusCode = 500;
        res.setHeader('Content-Type','application/json');
        res.send('unable to perform operation'+err)
    }
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});