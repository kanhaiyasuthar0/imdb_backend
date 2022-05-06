const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  username: { type: String },
  token:{type:String, default:"na"},
  isLogin : {type:Boolean, default:false}
});

const user = mongoose.model("user", userSchema);
module.exports = user;
