const express = require('express')
const app = express()

require("./db/conn")

const port = process.env.PORT || 3000

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