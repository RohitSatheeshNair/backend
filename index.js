var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var passport = require("passport")
const app= express()
// var bcrypt= require('bcryptjs')
app.use(bodyParser.json())
// var user = require('./models/user')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
const { body, validationResult } = require('express-validator');
mongoose.connect('mongodb://localhost:27017/newDb',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
const urlencodedParser = bodyParser.urlencoded({ extended: false })

var db =mongoose.connection;

db.on('error',()=>console.log("error in connecting to database"));
db.once('open',()=>console.log("Connected to database"));

app.post("/sign_up",(req,res)=>{
   var name = req.body.name;
   var email = req.body.email;
   var phno = req.body.phno;
   var password = req.body.password;
 
   var data = {
        "name":name,
        "email":email,
        "phno":phno,
        "password":password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Sign up record Inserted Sucessfully");
    }); 
    return res.redirect('login.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);

console.log("Listening on Port 3000");


app.post("/feedback",(req,res)=>{
    var email = req.body.email;
    var message = req.body.msge;

    var data = {
        "email":email,
        "message":message
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Feed back Record Inserted Sucessfully");
    });
    return res.redirect('homepage.html')
})

app.post("/form",(req,res)=>{
    var first_name =req.body.first_name;
    var last_name =req.body.last_name;
    var Age=req.body.AGE;
    var Sex =req.body.SEX;
    var phone =req.body.phone;
    var Bloodgroup =req.body.Blood_group;
    var Date =req.body.date;
    var Time =req.body.Time;
    var email = req.body.email;
    var Address = req.body.Address;

    var data = {
        "First name":first_name,
        "Last name":last_name,
        "Age":Age,
        "Sex": Sex,
        "Phone no:":phone,
        "Blood group":Bloodgroup,
        "Date":Date,
        "Time":Time,
        "email":email,
        "Address":Address
       
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Form Inserted Sucessfully");
    });
    return res.redirect('homepage.html')
})


app.get('/log_in', (req, res) => {
    res.sendFile(__dirname + '/public/homepage.html');
  });


//  app.get('/log_in', function (req, res) {
//     db.User.findOne({
//          where: {
//              email: req.body.email
//                 }
//     }).then(function (user) {
//         if (!user) {
//            res.redirect('./public/login.html');
//         } else {
// bcrypt.compare(req.body.password, user.password, function (err, result) {
//        if (result == true) {
//            res.redirect('./public/homepage.html');
//        } else {
//         res.send('Incorrect password');
//         res.redirect('./public/login.html');
//        }
//      });
//     }
//  });
// });