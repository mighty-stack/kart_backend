console.log('Hello World!')
const express = require('express')
const app = express()
require("dotenv").config()
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require("./route/user.route")
const productRouter = require("./route/product.route")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use("/user", userRouter)
app.use("/products", productRouter)
app.set("view engine", "ejs")
let allCustomers = []
let URI = process.env.MONGO_DB_URI
mongoose.connect(URI)
.then(()=>{
    console.log("mongodb has connected")
})
.catch((err)=>{
    console.log("an error has occured", err)
})
const PORT = 3001

// app.listen take 2 parameters 1. a portnumber 2. a callback function: 
app.listen(PORT, (err) => {
    if (err) {
        console.log('server did not start', err)
    } else {
        console.log("Server has started")
    }
})