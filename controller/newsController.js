const News = require("../model/news");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = {
  //! Get all news
  getAllNews: async function async(req, res) {
    try {
      const news = await News.find();
      res.json({
        quantity: news.length,
        success: true,
        data: {
          news,
        },
      });
    } catch (error) {
      res.json({
        success: false,
        message: error,
      });
    }
  },

  //! Get One news by id
  getOneNews: function (req, res) {
    try {
      const id = req.params.id;
      News.findById(id, (err, doc) => {
        if (err) return res.send({ success: false, message: "Invalid id " });

        res.status(200).json({ success: true, data: { doc } });
      });
    } catch (error) {
      res.json({
        success: false,
        message: "Error",
      });
    }
  },

  //! Create news
  createNews: async function (req, res) {
    try {
      const newNews = await News.create(req.body);
      res.json({
        success: true,
        data: {
          newNews,
        },
      });
    } catch (error) {
      res.json({
        success: false,
        message: error,
      });
    }
  },

  //! Update
  updateNews: async function (req, res) {
    // try {
    //   const id = req.params.id;
    //    News.findByIdAndUpdate(id, { ...req.body }, async (err, result) => {
    //     if (err) return res.send({ success: false, message: "Invalid id " });
    //     res.status(200).json({ success: true, ...result._doc, ...req.body });
    //   });
    // } catch (err) {
    //   res.json({
    //     success: false,
    //     message: "Error",
    //   });
    // }
  },

  //! Delete
  deleteNews: function (req, res) {
    try {
      const id = req.params.id;
      News.findByIdAndRemove(id, (err) => {
        if (!err) res.json({ message: "Success!" });
        else res.status(500).json("Error");
      });
    } catch {}
  },
};
