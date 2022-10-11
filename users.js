// Start
const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const app = express();
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://gurban:300793mm@cluster0.qob0oxl.mongodb.net/categories?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

//DB TABLE
const userSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  password: String,
  addDate: String,
});

app.path("addDate") instanceof Date;

const User = mongoose.model("User", userSchema);

//GETALL
app.get("/users", (req, res) => {
  User.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(500).json(err);
    }
  });
});

//GET id
app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  User.findById(id, (err, doc) => {
    if (!err) {
      if (doc) res.json(doc);
      else res.status(404).json({ message: "Not found!" });
    } else {
      res.status(500).json(err);
    }
  });
});

//Post
app.post("/users", (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  var category = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    addDate: req.body.addDate,
  });
  category.save();
  res.send("Success!!");
});

//Delete
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndDelete(id, (err) => {
    if (!err) res.json({ messagae: "Success!" });
    else res.status(500).json(err);
  });
});

app.listen(3020, () => {
  console.log("Server is running!!");
});
