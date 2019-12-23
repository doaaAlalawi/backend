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
const PORT = process.env.PORT || 5000;
const DB = process.env.DB_CONNECT;

var allowedOrigins = ["http://localhost:5000", "https://git.heroku.com/community-for-developer.git"];

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var message =
          "The CORS policy for this application does not allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  })
);



app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/user",userRoutes)
app.use("/UserInfoRoutes",UserInfoRoutes)
app.use("/project",projectRoutes)
app.use("/job",jobRoutes)
app.use("/meetup",meetupRoutes)
app.use("/UserInfoRoutes",UserInfoRoutes)


// connect to mongoose
mongoose.connect(DB , 
{useNewUrlParser : true , useUnifiedTopology: true } )
.then(()=> console.log('Mongodb is running'),(err)=> console.log(err) )

app.listen(PORT, () => console.log("express running"));