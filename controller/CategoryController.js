const Category = require("../model/Category");
const bodyParser = require("body-parser");
const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = {
    getAllCategories: async function async(req, res) {
        try {
            Category.find({}, (err, docs) => {
                if (!err) {
                    res.json(docs);
                } else {
                    res.status(500).json(err);
                }
            });
        } catch (error) {
            res.json({
                success: false,
                message: error,
            });
        }
    },

    getOneCategory: function (req, res) {
        try {
            let id = req.params.id;
            Category.findById(id, (err, doc) => {
                if (!err) {
                    if (doc) res.json(doc);
                    else res.status(404).json({ message: "Not found!" });
                } else {
                    res.status(500).json(err);
                }
            });
        } catch (error) {
            res.json({
                success: false,
                message: "Error",
            });
        }
    },

    addCategory: async function (req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            var category = new Category({
                name: req.body.name,
                description: req.body.description,
            });
            category.save();
            res.send("Success!!");
        } catch (error) {
            res.json({
                success: false,
                message: error,
            });
        }
    },

    deleteCategory: function (req, res) {
        try {
            let id = req.params.id;
            Category.findByIdAndDelete(id, (err) => {
                if (!err) res.json({ message: "Success!" });
                else res.status(500).json(err);
            });
        } catch {
            res.json({
                success: false,
                message: error,
            });
        }
    },
};
