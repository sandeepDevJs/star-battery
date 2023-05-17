const express= require('express')
const User=require('../models/UserSchema')
const jwt=require('jsonwebtoken')
const router=express.Router()
const config=require('../config')
const { JWE }=require('jose');
const bodyParser = require('body-parser');
const app=express()
const { TokenExpiredError } = require('jsonwebtoken');
const CryptoJS = require("crypto-js");


router.post('/',async(req,res)=>{

    
    try{

        
    const data= {username:req.body.username,password:req.body.password}
    const result=await User.GetUser(data)
    console.log(result)
    if (result===401||!result){
        
        
        res.status(401).send('Invalid Username or Password')
    }
    if(result){

        const payload=await {
            _id:result._id,
            username:result.username,
            first_name:result.first_name,
            middle_name:result.middle_name,
            last_name:result.last_name,
            issuperuser:result.issuperuser,
            isstaff:result.isstaff,
        }
        const encryptedPayload =await CryptoJS.AES.encrypt(JSON.stringify(payload),config.JWT_SECRET_KEY).toString();
        const token=jwt.sign({payload:encryptedPayload},config.JWT_SECRET_KEY,{ expiresIn: '2h' })
            // res.cookie('token',token,{httpOnly:true})
            
      await User.updateOne({_id:result._id},{$set:{isactive:true}})




            res.status(200).send(token)
    }
    } 
    catch(err) {
        if (err instanceof TokenExpiredError) {
          // Clear the token from the user's browser to log them out
          res.clearCookie('token');
          
          // Return an error response to the user
          return res.status(401).json({ message: 'Your session has expired. Please log in again.' });
        }
    
        
      }
    


})



module.exports=router