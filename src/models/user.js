const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email:{type:String  },
    password:{type:String },
    firstName:{type:String  },
    lastName:{type:String },
    

})

const user = mongoose.model("user", userSchema);
module.exports = user;  