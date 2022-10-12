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
const validator = require("validator");
mongoose.connect(
  "mongodb+srv://gurban:300793mm@cluster0.qob0oxl.mongodb.net/categories?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

//DB TABLE
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,

    required: [true, "Email required"],
  },
  password: {
    type: String,
    required: true,
  },
  addDate: { type: Date, default: Date.now },
});

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
  const { id } = req.params;
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
app.post("/users", body("email").isEmail(), (req, res) => {
  const { name, surname, email, password, addDate } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "sehv" });
  }
  var category = new User({
    name,
    surname,
    email,
    password,
    addDate,
  });
  category.save();
  res.send("Success!!");
});

//Delete
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id, (err) => {
    if (!err) res.json({ messagae: "Success!" });
    else res.status(500).json(err);
  });
});

app.listen(3020, () => {
  console.log("Server is running!!");
});
