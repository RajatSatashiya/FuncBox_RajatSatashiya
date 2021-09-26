const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../model/userModel");

//middleware
function checkNotAuthentication(req, res, next) {
  if (req.cookies.username) {
    return res.redirect("/bucketlist");
  }
  next();
}

//routing
router.get("/", checkNotAuthentication, (req, res) => {
  res.render("login");
});
router.post("/", checkNotAuthentication, async (req, res) => {
  //check if user exists
  const doesExist = await user.findOne({ username: req.body.username });

  //log the user in and store the cookies
  if (doesExist) {
    user.find({ username: req.body.username }).then((data) => {
      bcrypt.compare(req.body.password, data[0].password, (err, result) => {
        if (err) {
          console.log("Error: ", error);
        } else {
          if (result) {
            res.cookie("username", data[0].username);
            res.render("bucket");
          } else {
            res.send("wrong credentials");
          }
        }
      });
    });
  } else {
    res.send("wrong credentials");
  }
});
module.exports = router;
