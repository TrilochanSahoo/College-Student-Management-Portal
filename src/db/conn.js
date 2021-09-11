const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/collegePortal").then(()=>{
    console.log("connection successfull")
}).catch((e)=>{
    console.log(e)
})