var express = require('express');
var router = express.Router();

var user=require('../model/user')
router.post("/reg",(req,res)=>{
  var userName=req.body.userName;
  user.findOne({userName:userName}).select("userName")
  .then((data)=>{
    if(data==null){
      var newuser=new user(req.body);
      newuser.save()
      .then(()=>res.send("user registered"))
      .catch((err)=>console.log(err))
    }else{
      res.send("user already exist")
    }
  })
})

router.get('/getUsers',(req,res)=>{
  user.find()
  .then((data)=>res.send(data))
  .catch((err)=>console.log(err))
}
);


router.post('/login',(req,res)=>{
  var {userName,userPassword}=req.body;
  user.findOne({userName:userName}).select("userName userPassword userRole")
  .then((data)=>{
    if(data==null){
      res.send("user not found")
    }else{
      if(data.userPassword==userPassword){
        if(data.userRole=="admin"){
          res.send("Login success as admin")
        }else if(data.userRole=="user"){
          res.send("Login success as user")
        }
      }else{
        res.send("UserName or Password is incorrect")
      }
    }
  })
})
module.exports = router;
