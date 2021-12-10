const userRouter = require('express').Router();
const Users = require('../models/user');
const passport = require('passport');
const authenticate = require('../authentication')
// userRouter.route('/get')
// .get((req, res) => {

//     Users.find({}).then((users)=>{
//         // res.sendStatus(200);
//         res.statusCode = 200;
//         res.setHeader('Content-Type','application/json  ');
//         res.send(users);
//     },err=>next(err)).catch((err)=>console.log(err));;

// });

userRouter.route('/signup')
    .post((req, res) => {
        let { username, password, email, phoneNumber, address } = req.body;
        console.log({ username, password, email, phoneNumber })
        Users.register(new Users({ username: username }), password, (err, user) => {
            if (err) {
                next(err);
            }
            else{
                user.email = email;
                user.phoneNumber = phoneNumber;
                user.address = address;
                user.save((err,user)=>{
                    passport.authenticate('local'),(req,res)=>{
                        res.sendStatus(200);
                        res.setHeader('Content-Type','application/json  ');
                        res.json(user);                            
                    }
                });

            }

            // }))

        })
    });
userRouter.post('/signin', passport.authenticate('local', { failureFlash: true }), (req, res) => {

    var token = authenticate.getTokens({ _id: req.user._id });
    console.log(token);
    res.setStatus = 200;
    res.setHeader('Content-Type', 'aplication/json');
    res.send({success:true,status:"Successfully Registered",token:token});
})


// var authenticate = Users.authenticate();
// authenticate(email,password,(err,result)=>{
//     if(err){
//         res.sendStatus(500);
//         res.setHeader('Content-Type','application/json  ');
//         res.send({err:err});
//     }
//     res.sendStatus(200);
//     res.setHeader('Content-Type','application/json  ');
//     res.send({result:result});
// }
// })


module.exports = userRouter;