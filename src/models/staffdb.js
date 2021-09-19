const mongoose = require("mongoose")

const staffDbSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email : {
        type : String,
        required : true
    },
    mobileno : {
        type : Number,
        required : true
    },
    department : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword : {
        type : String
    },
    subject : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        required : true
    }

})

const Staffdb = new mongoose.model("Staffdb", staffDbSchema)
module.exports = Staffdb