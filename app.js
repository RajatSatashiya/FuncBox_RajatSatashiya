//acquiring env variables
require("dotenv").config();

//libraries
const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const initializePassport = require("./passport-config");
initializePassport(passport);
const user = require("./model/userModel");

//import the routes and models
const login = require("./routes/login");
const signup = require("./routes/signup");
const bucket = require("./routes/bucket");

//create the server
const app = express();
const PORT = process.env.PORT;

//middleware
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//mongodb connection
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("database connected");
});

//routing
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/bucketlist", async (req, res) => {
  const bucks = await user.findOne({ username: req.cookies.username });
  res.render("bucketlist", { data: bucks.buckets });
});
app.post("/logout", (req, res) => {
  res.clearCookie("username");
  res.redirect("/login");
});
app.use("/login", login);
app.use("/signup", signup);
app.use("/bucket", bucket);

//start the server
app.listen(PORT, () => {
  console.log(`server has started at ${PORT}`);
});
