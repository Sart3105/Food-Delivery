const express = require("express")

const router = express.Router()

const {getDishes} = require('../controller/dishesController')

router.get("/dishes",getDishes)

module.exports = router

