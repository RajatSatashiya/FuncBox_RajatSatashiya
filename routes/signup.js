//libraries
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../model/userModel");

//variables
var saltRounds = 10;

//middleware
function checkNotAuthentication(req, res, next) {
  if (req.cookies.username) {
    return res.redirect("/bucketlist");
  }
  next();
}
//routing
router.get("/", checkNotAuthentication, (req, res) => {
  res.render("signup");
});
router.post("/", checkNotAuthentication, async (req, res) => {
  var { username, email, password } = req.body;

  //check if username is unique
  const doesExist = await user.findOne({ username: username });

  //hash the password and store details to database
  if (doesExist) {
    return res.send("username already exists");
  } else {
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.log("Error: ", err);
      } else {
        res.cookie("username", username);
        new user({ username, email, password: hashedPassword }).save();
        res.redirect("bucket");
      }
    });
  }
});
//exporting the routes
module.exports = router;
