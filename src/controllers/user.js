const express = require("express");
const app = express();

const passport = require("../../auth/google");
const user = require("../models/user");
const jwt = require("../checker/jwt")
const uuid = require("uuid")
const bodyParser = require("body-parser");
// app.use(passport.initialize());
app.use(bodyParser.json([]))
let token;
let email;
app.get("/", (req, res, next) => {
  res.send("Your app is ready");
});
app.get("/signin", (req, res, next) => {
  res.send("signin");
});

app.get("/failed", (req, res) => {
  res.send("Failed");
});
app.get("/success", (req, res) => {
  
  res.status(200).json(token)
});
app.post("/register", (req,res,next)=>{
 
  // let userData = {
  //   email: req.body.email,
  //   password: req.body.password,
  //   username: req.body.username,
 
 
  // }
  // console.log(userData);
  // console.log(req.body);
  res.json(req.body)
  // res.send("hello I am backend")
})

app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  async function (req, res) {
      email = req.user.emails[0].value;

    let response = await user.findOne({ email })
    if (response) {
        token = jwt.getToken(response.email);
        
    } else {
      let userObj = {
        email: req.user.emails[0].value,
        password: Math.floor(Math.random()*1000),
        firstName: req.user._json.given_name,
        lastName: req.user._json.family_name,
      };

      let response1 = await user.insertMany([userObj]);
    //   res.json(jwt.getToken(response1.))
    // console.log("res1", response1);
    }

    res.redirect("/success");

   
  }
);

module.exports = app;
