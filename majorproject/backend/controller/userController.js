const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getUser = async (req, res) => {
  const { name, email, password } = req.body;

  const emailexist = await UserModel.findOne({ email: email });
  if (emailexist) {
    return res.status(400).send("user already exits");
  }

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);

  const newUser = new UserModel({
    name: name,
    email: email,
    password: hashpassword,
  });

  const savedUser = newUser.save();

  const token = jwt.sign({ userId: savedUser._id }, "randomsecret");
  return res.status(200).send({
    user: newUser,
    token: token,
  });
};

const getLogin = async (req, res) => {
  
const {email, password} = req.body;

const user = await UserModel.findOne({email:email})

if(!user){
  return res.status(400).send("User not login")
}

const isPasswordMatchingfromDB = await bcrypt.compare(password, user.password);

if(isPasswordMatchingfromDB){

  const token = jwt.sign({userId: user._id},"randomsecret")
 return res.status(200).send({
 user: user,
 token: token,

})

}

return res.status(401).send("password is incorrect")

};

module.exports = { getUser, getLogin };
