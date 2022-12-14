const bodyParser = require("body-parser");
const express = require("express");

const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt")
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = {
    updateUser: async function async(req, res) {
        if (req.body.userId === req.params.id) {
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt)
            }
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true })
                res.status(200).json({
                    success: true,
                    data: { updatedUser }
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
                message: "You can update only your account!"
            })
        }
    },
    deleteUser: async function async(req, res) {
        if (req.body.userId === req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                try {
                    await Post.deleteMany({ username: user.username })
                    await User.findByIdAndDelete(req.params.id)
                    res.status(200).json({
                        success: true,
                        message: "User has been deleted"
                    })
                } catch (err) {
                    res.status(500).json({
                        success: false,
                        message: err
                    });
                }
            } catch (err) {
                res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }
        } else {
            res.status(401).json({
                success: false,
                message: "You can delete only your account!"
            })
        }
    },
    getUserById: async function async(req, res) {
        try {
            const user = await User.findById(req.params.id);
            const { password, ...others } = user._doc;
            res.status(200).json({
                success: true,
                data: { others }
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err
            })
        }
    },

}