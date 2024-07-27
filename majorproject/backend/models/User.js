const mongoose = require("mongoose");

const UserModel = mongoose.model("user", {
  name: { type: String, reqired: true },
  email: { type: String, require: true },
  password: { type: String, required: true },
  
});

module.exports = UserModel;