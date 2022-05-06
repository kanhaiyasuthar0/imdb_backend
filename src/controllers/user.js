const express = require("express");
const app = express();
const passport = require("../../auth/google");
const user = require("../models/user");

const uuid = require("uuid")

app.use(passport.initialize());
// app.use()
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
  // let time = new Date();
  // console.log(time);

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
    let email = req.user.emails[0].value;

    let response = await user.findOne({ email })
    if (response) {
        console.log(response)
    } else {
      let userObj = {
        email: req.user.emails[0].value,
        password: uuid(),
        firstName: req.user._json.given_name,
        lastName: req.user._json.family_name,
      };

      let response1 = await user.insertMany([userObj]);
    }

    res.redirect("/success");

   
  }
);

module.exports = app;
