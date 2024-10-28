const express = require("express")
const connectDB = require("./config/db.js")
require("dotenv").config()
const port = process.env.PORT
const app = express()
connectDB()

app.listen(port,()=>{
    console.log(`server run on port ${port}`)
})