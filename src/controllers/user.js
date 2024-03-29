const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("../../auth/google");
const user = require("../models/user");
const jwt = require("../checker/jwt")
const uuid = require("uuid")
const bodyParser = require("body-parser");
// app.use(passport.initialize());
app.use(bodyParser.json([]))
app.use(express.json());
app.use(cors())
let token;
let email;
app.get("/", (req, res, next) => {
  res.send("Your app is ready");
});
app.post("/signin", async (req, res, next) => {

  let userData = {
    email: req.body.email,
    password: req.body.password
  }

  let email = req.body.email
  console.log(req.body);
  // res.send(req.body)
  let response1 = await user.findOne({ email })
  // console.log(resp);
  // console.log(response1.password == req.body.password);
    if (response1 && response1.password == req.body.password) {
        token = jwt.getToken(response1.email);
        res.status(200).json(token )
    } 
    else {
      

     res.status(401).json({
       status: false,
       message:"Invalid credentials"
     })
      
    }
  
  

  




  // res.send("signin");
});

app.get("/failed", (req, res) => {
  res.send("Failed");
});
app.get("/success", (req, res) => {
  

  res.status(200).json(token)
  

  
});
app.post("/register",async (req,res,next)=>{
 console.log("inside register");
 
  let email = req.body.email
  let response1 = await user.findOne({ email })
    if (response1) {
      console.log("in if");
        token = jwt.getToken(response1.email);
        res.send(response1 )
    } else {
      console.log("in else");
      token = jwt.getToken(req.body.email);

      let userData = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        
        
      }
      let response1 = await user.insertMany([userData]);

        res.send(response1)
    }
  
  
  
})

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
const successLoginUrl = "http://localhost:3000/login/success"
const faliureLoginUrl = "http://localhost:3000/login/error"
app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect:faliureLoginUrl ,
    successRedirect:successLoginUrl,
    
  }),
  async function (req, res) {
    console.log("success");
      email = req.user.emails[0].value;
      console.log(req.user.displayName);
      
    let response = await user.findOne({ email })
    console.log("inside callback")
    if (response) {
      console.log("if");
        token = jwt.getToken(response.email);
        // window.location.href = "http://localhost:3000/";
        
    } else {
      console.log("else");
      let userObj = {
        email: req.user.emails[0].value,
        password: Math.floor(Math.random()*1000),
        username:req.user.displayName,
        token:jwt.getToken(req.user.emails[0].value),
        isLogin:true
      };
      
      let response1 = await user.insertMany([userObj]);
      
    }
    // // console.log("success");
    res.redirect("/success");

   
  }
);

module.exports = app;
