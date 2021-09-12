const express = require('express')
const path = require("path")
const hbs = require('hbs')
const app = express()

require("./db/conn")
const Admindb = require("./models/admindb")

const port = process.env.PORT || 3000

// path 
const static_path = path.join(__dirname,"../public")
const view_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine", "hbs")
app.set("views", view_path)
hbs.registerPartials(partials_path)
app.use(express.static(static_path))

// Home  
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


// login 
app.get('/adminLogin',(req, res)=>{
    res.render("adminLogin")
})
app.get('/studentLogin',(req, res)=>{
    res.render("studentLogin")
})
app.get('/staffLogin',(req, res)=>{
    res.render("staffLogin")
})

app.post("/adminLogin", async(req, res)=>{
    try {
        const userid = req.body.userid
        const password = req.body.password

        const userName = await Admindb.findOne({userid:userid})
        if(userName.password===password){
            res.status(201).render("adminDashboard")
        }
        else{
            res.send("password are not matching")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

// admin dashboard 
app.get('/adminDashboard',(req, res)=>{
    res.render("adminDashboard")
})

app.get('/studentRegistration',(req, res)=>{
    res.render("studentRegistration")
})

app.get('/adminDashboard',(req, res)=>{
    res.render("adminDashboard")
})



app.get('*',(req, res)=>{
    res.render("404error",{
        errorMsg : "opps! page not found"
    })
})

app.listen(port,()=>{
    console.log(`server is running`)
})