const mongoose=require('mongoose')
const { errors } = require('jose')




    mongoose.connect('mongodb+srv://rogerfisher111:StarBatteryMumbra23@starbattery.ow2tewe.mongodb.net/StarBattery',{useNewUrlParser:true}).then(console.log('connection succesfull')).catch((err)=>console.log(err))
    
    
    const conn=mongoose.connection
    
    require('../models/WarentySchema')


module.exports=conn
