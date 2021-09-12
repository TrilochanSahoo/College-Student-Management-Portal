const mongoose = require("mongoose")
const adminDbSchema = new mongoose.Schema({
    userid : {
        type:String,
        required:true
    },
    password : {
        type: String,
        required:true
    }
})

// create collection 
const Admindb = new mongoose.model("Admindb",adminDbSchema)

// insert documnet data
const data1 = new Admindb({
    userid : "admin",
    password : "123"
})
data1.save()
module.exports = Admindb