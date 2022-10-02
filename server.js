const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./model/User");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 5000;
}

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())
app.use(bodyParser.json())

const mongoAtlas =  "mongodb://localhost:27017/userDB"


try {
    // Connect to the MongoDB cluster
     mongoose.connect(
       mongoAtlas,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }

const db = mongoose.connection;
db.on("error", (err) => console.log(`Connection error ${err}`));
db.once("open", () => console.log("Connected to DB!"));


//signup api
app.post('/signup', (req,res)=>{
    const user = new User({
        email : req.body.email,
        password : req.body.password,
        date : req.body.date,
    });
    user.save()
    .catch((err) => console.log(err));
    res.json(('save to db: ' + user));
    console.log(req.body)
})




app.listen(port, (req,res)=>{
    console.log("Server is running successfullly!")
})