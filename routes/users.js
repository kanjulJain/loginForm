const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/testingendgame2");

const userschema=mongoose.Schema({
  username:String,
  password:String,
  secret:String
  // username: String,
  // nickname: String,
  // description: String,
  // categories: {
  //   type: Array,
  //   dafault: []
  // },
  // datecreated: {
  //   type: Date,
  //   default: Date.now()
  // }
})
userschema.plugin(plm);
module.exports=mongoose.model("user",userschema);