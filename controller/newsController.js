const News = require("../model/news");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = {
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

  getOneNews: function (req, res) {
    //     try {
    //       const id = req.params.id;
    //       const news = News.findById();
    //       if (!news) return res.send({ success: false, message: "Invalid id " });
    //       res.json({ success: true, data: { news } });
    //     } catch (error) {
    //       res.json({
    //         success: false,
    //         message: error,
    //       });
    //     }
  },

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
};
