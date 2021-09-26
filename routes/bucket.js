const express = require("express");
const router = express.Router();
const user = require("../model/userModel");
const Bucket = require("../model/bucketModel");

//middleware
function checkAuthentication(req, res, next) {
  if (req.cookies.username) {
    return next();
  }
  res.redirect("login");
}

//routes
router.get("/", checkAuthentication, (req, res) => {
  res.render("bucket");
});

router.post("/", checkAuthentication, async (req, res) => {
  if (req.cookies.username) {
    const savedUsername = req.cookies.username;

    //check if bucketname is unique
    const bucketName = await user.findOne({
      username: savedUsername,
      "buckets.name": req.body.bucketname,
    });
    if (bucketName) {
      return res.send("Bucket name already exists");
    }

    //add the bucket details to database
    await user.findOneAndUpdate(
      { username: savedUsername },
      {
        $addToSet: {
          buckets: {
            name: req.body.bucketname,
            description: req.body.description,
          },
        },
      },
      { upsert: true, new: true }
    );
    res.redirect("bucketlist");
  } else {
    res.render("bucket");
  }
});
module.exports = router;
