const express = require('express')
const app = express()
const port = 5000

const cors = require("cors")
//const {getDishes} = require("./controller/dishesController")

const router = require('./routes/dishesRoutes')
const userRouter = require('./routes/userRoutes')
const DishesModel = require('./models/Dishes')

const mongoose = require('mongoose');

app.use(express.json());

app.use(cors());

mongoose.connect('mongodb+srv://sarthakpuri311996:fr3asOyADO4HRHAb@cluster0.cjqh0fd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'));
//console.log("Hello")
app.get('/', (req, res) => {
  
  res.send('Hello World!')
})

app.use(
  (req, res, next) => {
    console.log('Time: ', Date.now())
    next()
  }
)
app.use("/api",userRouter)

app.use("/api", router ) 

app.get("/api/food",async (req,res)=>{
  const dishes = await DishesModel.findOne({name:"Dosa"});
console.log(dishes)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})