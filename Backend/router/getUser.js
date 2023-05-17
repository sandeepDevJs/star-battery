const express= require('express')
const User=require('../models/UserSchema')
const jwt=require('jsonwebtoken')
const router=express.Router()
const config=require('../config')
const { JWE }=require('jose');
// const bodyParser = require('body-parser');
const app=express()
const {JWT_SECRET_KEY}=require('../config')
const crypto = require('crypto'); 
const {Encryption_key}=require('../config')
const CryptoJS = require('crypto-js');




async function encryptData(data, key) {
  const cipher = await crypto.createCipher('bf', key);
  let encrypted =await  cipher.update(data, 'utf8', 'hex');
  encrypted += await cipher.final('hex');
  return encrypted;
}


router.get('/',async(req,res)=>{


    
const authHeader = await req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];
    
    if(!token){
      return
    }
    const payload=await jwt.verify(token,JWT_SECRET_KEY)

    try{

      const userData=await User.findById(payload._id)
      
      const user={username:userData.username,first_name:userData.first_name,last_name:userData.last_name,_id:userData._id,issuperuser:userData.issuperuser,isstaff:userData.isstaff}
      
      



      res.send(user)
    }
    catch(err){
      res.send(err)
    }
})
module.exports=router