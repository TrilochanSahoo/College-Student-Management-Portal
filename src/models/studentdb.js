const mongoose = require("mongoose")

const studentDbSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email : {
        type : String,
        required : true
    },
    rollno : {
        type : Number,
        required : true
    },
    mobileno : {
        type : Number,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword : {
        type : String
    },
    department : {
        type : String,
        required : true
    },
    section : {
        type : String,
        required : true
    },
    year : {
        type : Number,
        required : true
    },
    gender : {
        type : String,
        required : true
    }

})

const Studentdb = new mongoose.model("Studentdb", studentDbSchema)
module.exports = Studentdb