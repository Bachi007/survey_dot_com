var mongo=require('mongoose')
var schema=mongo.Schema;
var userSchema=new schema({
    userName:String,
    userEmail:String,
    userPassword:String,
    userMobile:String,
    userRole:String,

})
var user=mongo.model('user',userSchema)
module.exports=user;