const express= require('express')
const router=express.Router()
const User=require('../models/UserSchema')
const app=express()


router.post('/',async(req,res)=>{

    

    const result=await User.updateOne({_id:req.body.id},{$set:{isactive:false}})


    if(!result){
        res.status(404).send('Problem loggig out')
    }
    res.status(200).send('user logged out')



})


module.exports=router