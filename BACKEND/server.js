const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors= require("cors");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());


const URL = process.env.MONGODB_URL;
 
 
mongoose.connect(URL,{
   // useCreateIndex: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    //useFindAndModify:false
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB Connection success!");
});

app.listen(PORT, ()=>{
    console.log('Server is up and running on port number: ',PORT)
})

//import Appointments routes 
const Appointments = require("./routes/appointments");

// //route Appointments middleware
app.use("/Appointments",Appointments);

//import lab routes
const labRoutes = require('./routes/labs_c');

//lab route middleware
app.use(labRoutes);

//import payments routes
const paymentRoutes = require("./routes/Payment");
//import payment route middleware
app.use(paymentRoutes);

//import staff route
const staffRouter = require("./routes/staffmembers_t");
//import staff middleware
app.use("/staff",staffRouter);

const loginRouter = require("./routes/login")

app.use("/auth", loginRouter);