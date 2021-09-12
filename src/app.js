const express = require('express')
const path = require("path")
const hbs = require('hbs')
const app = express()

require("./db/conn")

const port = process.env.PORT || 3000

// path 
const static_path = path.join(__dirname,"../public")
const view_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

app.set("view engine", "hbs")
app.set("views", view_path)
hbs.registerPartials(partials_path)

app.use(express.static(static_path))

// routing 
app.get('/',(req, res)=>{
    res.render("index")
})

app.get('/courses',(req, res)=>{
    res.send(`Hello to courses page page`)
})

app.get('/staffs',(req, res)=>{
    res.send(`Hello to staffs page`)
})

app.get('/login',(req, res)=>{
    res.render("login")
})

app.get('*',(req, res)=>{
    res.render("404error")
})

app.listen(port,()=>{
    console.log(`server is running`)
})