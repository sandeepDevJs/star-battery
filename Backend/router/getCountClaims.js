const express=require('express')
const warrantyClaims=require('../models/WarentySchema')




const router=express.Router()




router.get('/',async (req,res)=>{

    const pendingClaims= await warrantyClaims.GetCount('Pending')
    const acceptedClaims= await warrantyClaims.GetCount('Approved')
    const registeredClaims= await warrantyClaims.GetCount('Registered')

    if(!pendingClaims || !acceptedClaims|| !registeredClaims){

        res.statusCode(404).send('Problem getting claim count')
    }
    const Pendingcount=pendingClaims.length.toString()
    const acceptedCount=acceptedClaims.length.toString()
    const registeredCount=registeredClaims.length.toString()

    const finaldata={
        Pendingcount:Pendingcount,
        acceptedCount:acceptedCount,
        registeredCount:registeredCount

    }
   
    res.send(finaldata)
    
})

module.exports=router
