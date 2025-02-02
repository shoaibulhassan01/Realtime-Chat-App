require('dotenv').config();
const mongoose = require('mongoose')

const connectDB = async() =>{
 await mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Database Connected')
 }).catch((error)=>{
   console.log(error);
 })
}

module.exports = connectDB;