const mongoose = require("mongoose")
require("dotenv").config()

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("mongoDB connected successfully!")
        
    } catch (error) {
        console.log(error)  
    }

}

module.exports = connectDB