const userRouter = require('express').Router();
const Users = require('../models/user');
userRouter.route('/get')
.get((req, res) => {

    Users.find({}).then((users)=>{
        // res.sendStatus(200);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json  ');
        res.send(users);
    },err=>next(err)).catch((err)=>console.log(err));;

});

userRouter.route('/signup')
.post((req,res)=>{
    let {username,password,email,phoneNumber} = req.body;
    console.log({username,password,email,phoneNumber})
    //checking if the user already exists
    Users.register(new Users({username:username}),password,(err,user)=>{
        if(err){
            res.statusCode = 500;
            res.setHeader('Content-Type','application/json');
            res.send({err:err});
        }
        else{
            console.log('res')
                user.userName = username;
                user.email = email;
                user.phoneNumber = phoneNumber;
                user.save((err,user)=>{
                    if(err){
                        res.statusCode = 500;
                        res.setHeader('Content-Type','application/json');
                        res.send({err:err});
                        return;
                        }
                    else{
                        res.statusCode = 200;
                        res.setHeader('Content-Type','application/json');
                        res.send(user);
                    }
                    }
                    )
                }
            }
            )
        }
        );
                        
                        

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