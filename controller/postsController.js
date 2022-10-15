const bodyParser = require("body-parser");
const express = require("express");
const Post = require("../models/Post");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = {
    addPost: async function async(req, res) {
        console.log(req.file)
        const newPost = new Post(req.body);
        const imgPath = req.file.path.slice(6, req.file.path.length)
        try {
            const savedPost = await newPost.save();
            res.status(200).json({
                success: true,
                data: {
                    savedPost,
                    image: imgPath
                }
            })
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err
            })
        }
    },
    updatePost: async function async(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {
                try {
                    const updatedPost = await Post.findByIdAndUpdate(
                        req.params.id,
                        {
                            $set: req.body,
                        },
                        { new: true }
                    );
                    res.status(200).json(
                        {
                            success: true,
                            data: { updatedPost }
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
                    message: "You can update only your post!"
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err
            });
        }
    },
    deletePost: async function async(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (post.username === req.body.username) {
                try {
                    await post.delete();
                    res.status(200).json(
                        {
                            success: true,
                            message: "Post has been deleted..."
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
                    message: "You can delete only your post!"
                });
            }
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err
            });
        }
    },
    getPostById: async function async(req,res) {
        try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(
                {
                    success: true,
                    data: post
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
    getAllPosts: async function async(req, res) {
        const username = req.query.user;
        const catName = req.query.cat;
        try {
            let posts;
            if (username) {
                posts = await Post.find({ username });
            } else if (catName) {
                posts = await Post.find({
                    categories: {
                        $in: [catName],
                    },
                });
            } else {
                posts = await Post.find();
            }
            res.status(200).json(
                {
                    success: true,
                    data: { posts }
                });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: err
            });
        }
    }
}