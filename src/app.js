const express = require('express')
const path = require("path")
const app = express()

require("./db/conn")

const port = process.env.PORT || 3000
const static_path = path.join(__dirname,"../public")

app.use(express.static(static_path))

app.get('/',(req, res)=>{
    res.send(`Hello to Home page`)
})

app.get('/courses',(req, res)=>{
    res.send(`Hello to courses page page`)
})

app.get('/staffs',(req, res)=>{
    res.send(`Hello to staffs page`)
})

app.get('/login',(req, res)=>{
    res.send(`Hello to Login page`)
})


console.log(`subscribe`)

app.listen(port,()=>{
    console.log(`server is running`)
})