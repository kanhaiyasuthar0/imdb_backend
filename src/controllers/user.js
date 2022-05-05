const express = require("express");
const app = express();
const passport = require("../../auth/google");
const user = require("../models/user");
app.use(passport.initialize());
app.get("/signin", (req, res, next) => {
  res.send();
});

app.get("/failed", (req, res) => {
  res.send("Failed");
});
app.get("/success", (req, res) => {
  res.send(`Successfully login`);
});

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
     let email = (req.user.emails[0].value);
    
    let response =await user.findOne({email}).lean().exec();
    if(response){

       
    }else{
       
    let userObj = {
        email:req.user.emails[0].value ,
        password: "NA",
        firstName: req.user._json.given_name,
        lastName:req.user._json.family_name,
      };

      let response =  await user.insertMany([userObj]);
      
    }
    
    res.redirect("/success");



    

    // console.log(response)
  }
);

module.exports = app;
