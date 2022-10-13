// // Start
// const express = require("express");
// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const app = express();
// const bodyParser = require("body-parser");
// const { body, validationResult } = require("express-validator");
// const cors = require("cors");
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// mongoose.connect(
//   "mongodb+srv://gurban:300793mm@cluster0.qob0oxl.mongodb.net/categories?retryWrites=true&w=majority",
//   { useNewUrlParser: true }
// );

// //DB TABLE
// const categorySchema = new Schema({
//   name: String,
//   description: String,
// });

// const Category = mongoose.model("Category", categorySchema);

// //GETALL
// app.get("/categories", (req, res) => {
//   Category.find({}, (err, docs) => {
//     if (!err) {
//       res.json(docs);
//     } else {
//       res.status(500).json(err);
//     }
//   });
// });

// //GET id
// app.get("/categories/:id", (req, res) => {
//   let id = req.params.id;
//   Category.findById(id, (err, doc) => {
//     if (!err) {
//       if (doc) res.json(doc);
//       else res.status(404).json({ message: "Not found!" });
//     } else {
//       res.status(500).json(err);
//     }
//   });
// });

// //Post
// app.post("/categories", (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   var category = new Category({
//     name: req.body.name,
//     description: req.body.description,
//   });
//   category.save();
//   res.send("Success!!");
// });

// //Delete
// app.delete("/categories/:id", (req, res) => {
//   let id = req.params.id;
//   Category.findByIdAndDelete(id, (err) => {
//     if (!err) res.json({ message: "Success!" });
//     else res.status(500).json(err);
//   });
// });

// app.listen(3010, () => {
//   console.log("Server is running!!");
// });
