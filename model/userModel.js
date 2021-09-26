const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bucket = require("./bucketModel");

//creating schema
const userSchema = new Schema({
  username: {
    type: String,
    unique: "Username is already taken",
  },
  email: String,
  password: String,
  buckets: [Bucket.schema],
});

//exporting the model
module.exports = mongoose.model("funcUser", userSchema);
