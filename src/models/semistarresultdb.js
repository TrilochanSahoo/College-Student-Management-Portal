const mongoose = require("mongoose")

const resultDbSchema = new mongoose.Schema({
    rollno:{
        type : Number,
        required:true
    },
    semistar:{
        type : Number,
        required:true
    },
    subject1:{
        type : Number,
        required:true
    },
    subject2:{
        type : Number,
        required:true
    },
    subject3:{
        type : Number,
        required:true
    },
    subject4:{
        type : Number,
        required:true
    },
    subject5:{
        type : Number,
        required:true
    },
    subject6:{
        type : Number,
        required:true
    },
    total:{
        type : Number,
        required:true
    },
    percentage:{
        type:Number
    }

})

const Resultdb = new mongoose.model("SemistarResultdb", resultDbSchema)
module.exports = Resultdb