const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv/config");
const session = require('express-session')
const cors = require('cors')
const path = require('path')

const userRoutes = require('./routes/userRoutes')
const projectRoutes = require("./routes/projectRoutes")
const jobRoutes = require("./routes/jobRoutes")
const meetupRoutes = require("./routes/meetupRoutes")
const UserInfoRoutes = require("./routes/UserInfoRoutes")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/user",userRoutes)
app.use("/project",projectRoutes)
app.use("/job",jobRoutes)
app.use("/meetup",meetupRoutes)
app.use("/UserInfoRoutes",UserInfoRoutes)


// connect to mongoose
mongoose.connect('mongodb://localhost/project4', 
{useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) )

app.listen(5000, () => console.log("express running"));