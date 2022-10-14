const bodyParser = require("body-parser");
const express = require("express");
const Category = require("../models/Category");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = {

    //create category
    addCategory: async function async(req, res) {
        const newCat = new Category(req.body);
        try {
            const savedCat = await newCat.save();
            res.status(200).json(
                {
                    success: true,
                    data: { savedCat }
                });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err
            });
        }
    },

    updateCategory: async function async(req, res) {
        try {
            const cat = await Category.findById(req.params.id);
            if (cat.username === req.body.username) {
                try {
                    const updatedCategory = await Category.findByIdAndUpdate(
                        req.params.id,
                        {
                            $set: req.body,
                        },
                        { new: true }
                    );
                    res.status(200).json(
                        {
                            success: true,
                            data: { updatedCategory }
                        })
                } catch (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                }
            } else {
                res.status(401).json({
                    success: false,
                    message: "You can update only your category!"
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err
            });
        }
    },

    deleteCategroy: async function async(req, res) {
        try {
            const cat = await Category.findById(req.params.id);
            if (cat.username === req.body.username) {
                try {
                    await cat.delete();
                    res.status(200).json(
                        {
                            success: true,
                            message: "Category has been deleted..."
                        });
                } catch (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                }
            } else {
                res.status(401).json({
                    success: false,
                    message: "You can delete only your category!"
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err
            });
        }
    },

    getCategoryById: async function async(req, res) {
        try {
            const cat = await Category.findById(req.params.id);
            res.status(200).json(
                {
                    success: true,
                    data: cat
                });
        } catch (err) {
            res.status(500).json(
                {
                    success: false,
                    message: err
                }
            );
        }
    },

    getAllCategories: async function async(req, res) {
        try {
            const cats = await Category.find();
            res.status(200).json(
                {
                    success: true,
                    data: { cats }
                });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err
            });
        }
    },

};
