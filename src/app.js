const express = require('express')
const path = require("path")
const hbs = require('hbs')
const app = express()


require("./db/conn")
const Admindb = require("./models/admindb")
const Studentdb = require("./models/studentdb")
const Resultdb = require("./models/semistarresultdb")

const port = process.env.PORT || 3000

// path 
const static_path = path.join(__dirname,"../public")
const view_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine", "hbs")
app.set("views", view_path)

// helper function for 'inc' loop  
hbs.registerHelper('inc',function(value, options){
    return parseInt(value)+1
})

hbs.registerPartials(partials_path)
app.use(express.static(static_path))

// Home  
app.get('/index',(req, res)=>{
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
            // alert("Enter valid userId and Password.")
            res.render("adminLogin")
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

app.get('/studentDatabaseEdit',(req, res)=>{
    Studentdb.find({_id : req.query.id})
        .then(user =>{
            // console.log(user)
            res.render("studentDatabaseEdit",{userData : user})
        })
        .catch(err => {
            res.status(500).send("Error occured")
        })
})

app.post('/studentDatabaseEdit',(req, res) => {
    res.render('studentDatabaseEdit')
})

const updatefun = (req,res)=>{
    if(!req.body){
        return res.status(400).send("Data to update can not be empty")
    }
    const id = req.params.id
    // console.log(id)
    Studentdb.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data=>{
            if(!data){
                res.status(404).send("can not update user maybe user not found")
            }else{
                res.send(data)
            }
        })
        .catch(error =>{
            res.status(500).send("error update user information")
        })
}

const deletefun = (req, res)=>{
    const id = req.params.id
    Studentdb.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message : "can not delete maybe id not present"})
            }else{
                res.send({message : "user was deleted successfully"})
            }
        })
        .catch(error => {
            res.status(500).send({message : "could not delete user id"})
        })
}
app.put('/studentDatabase/:id',updatefun)
app.delete('/studentDatabase/:id',deletefun)


app.post("/studentRegistration",async(req, res)=>{
    try {
        const password = req.body.password
        const cpassword = req.body.confirmpassword
        if (password===cpassword){
            const registerStudent = new Studentdb({
                fullname : req.body.fullname,
                email : req.body.email,
                rollno : req.body.rollno,
                mobileno : req.body.mobileno,
                password : req.body.password,
                department : req.body.department,
                section : req.body.section,
                year : req.body.year,
                gender : req.body.gender
            })
            const registeredStudent = await registerStudent.save()
            res.status(201).render("adminDashboard")
        }else{
            res.send("password are not matching")
        }
        
    } catch (error) {
        res.status(400).send(error)
    }
})
app.post("/studentMarkUploadForm",async(req, res)=>{
    try {
            const semistarResult = new Resultdb({
                rollno : req.body.rollno,
                semistar : req.body.semistar,
                subject1 : req.body.subject1,
                subject2 : req.body.subject2,
                subject3 : req.body.subject3,
                subject4 : req.body.subject4,
                subject5 : req.body.subject5,
                subject6 : req.body.subject6
            })
            const uploadedResult = await semistarResult.save()
            // alert("result uploaded successfully")
            res.status(201).render("adminDashboard")
    } catch (error) {
        res.status(400).send(error)
    }
})

app.get('/studentDatabase',(req, res)=>{
    Studentdb.find()
        .then(user =>{
            // console.log(user)
            res.render("studentDatabase",{studentData : user})
        })
        .catch(err => {
            res.status(500).send("Error occured")
        })
})

app.get('/studentMarkUploadForm',(req, res)=>{
    res.render('studentMarkUploadForm')
})


app.get('*',(req, res)=>{
    res.render("404error",{
        errorMsg : "opps! page not found"
    })
})

app.listen(port,()=>{
    console.log(`server is running`)
})