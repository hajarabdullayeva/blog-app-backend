const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  desc: {
    type: String,
    required: true,
  },
  photo: [
    {
      type: String,
      isPoster: {
        type: Boolean,
        default: false,
      },
      src: String,
    },
  ],
  username: {
    type: String,
    required: true
  },
  categories: {
    type: Array,
    required: false
  },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, content: mongoose.Schema.Types.Comment, ref: "Comment" }
  ]
},
  { timestamps: true },
)

module.exports = mongoose.model("Post", PostSchema)
