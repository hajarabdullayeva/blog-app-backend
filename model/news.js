const mongoose = require("mongoose");
const { Schema } = mongoose;

const newsSchema = new Schema({
  title: {
    type: String,
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
});

const News = mongoose.model("news", newsSchema);
module.exports = News;
