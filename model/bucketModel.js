const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating schema
const bucketSchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  description: String,
});

//exporting the model
module.exports = mongoose.model("bucket", bucketSchema);
