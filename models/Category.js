const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true
    },
  },
  {timestamps: true}
)

module.exports = mongoose.model("Category", CategorySchema)
