const mongoose = require("mongoose");
const { Schema } = mongoose;

const newsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    require: [true, "Title must be defined"],
    unique: true,
  },
  content: {
    type: String,
    require: [true, "Content must be defined"],
  },
  createdDate: { type: Date, required: true, default: Date.now },
  categoryID: {
    type: String,
    required: true,
  },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, content: mongoose.Schema.Types.Comment, ref: "Comment" }
  ]
});

const News = mongoose.model("news", newsSchema);
module.exports = News;
