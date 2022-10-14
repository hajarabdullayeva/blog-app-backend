const bodyParser = require("body-parser");
const express = require("express");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = {

    //post comment
    postComment: async function async(req, res) {
        try {
            const id = req.params.id;
            Post.findById(id, async (err, doc) => {
                if (err) return res.send({ success: false, message: "Invalid id" });

                const newComment = await Comment.create(req.body);
                doc.comments.unshift(newComment);
                doc.save();
                res.send({ msg: 'success', data: newComment })

            });

        } catch (error) {

        }
    },

    // Get All Comments
    getComments: async function async(req, res) {
        try {
            const comments = await Comment.find();
            res.status(200).json({
                quantity: comments.length,
                success: true,
                data: {
                    comments,
                },
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error,
            });
        }
    },

    getCommentById: async function async(req, res) {
        try {
            const id = req.params.id;

            Comment.findById(id, async (err, doc) => {
                if (err) return res.send({ success: false, message: "Invalid id" });

                res.send({ msg: 'success', data: doc })

            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error,
            });
        }
    },
};
