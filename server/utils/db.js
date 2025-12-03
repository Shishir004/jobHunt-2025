const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db=mongoose.connection;
mongoose.connect(process.env.MONGODB_URI);
db.on('connected',()=>{
    console.log('connected to db successfully')
})
db.on('error',(error)=>{
    console.log("Error",error);
})
db.on('disconnect',()=>{
    console.log('disconnected successfully');
})
module.exports=db;