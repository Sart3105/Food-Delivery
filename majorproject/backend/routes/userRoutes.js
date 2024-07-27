const express = require('express')

const userRouter = express.Router()

const {getUser, getLogin} = require("../controller/userController")

userRouter.post("/user/register",getUser)
userRouter.post("/user/login",getLogin)

module.exports = userRouter