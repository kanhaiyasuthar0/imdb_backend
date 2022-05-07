const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique:true },
  password: { type: String,  unique:false },
  username: { type: String,  unique:false },
  token:{type:String, default:"na",  unique:false},
  isLogin : {type:Boolean, default:false,  unique:false}
});

const user = mongoose.model("user", userSchema);
module.exports = user;
