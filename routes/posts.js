const router = require("express").Router();
const Post = require("../models/Post");

//! CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      success: true,
      data: {savedPost}
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err
    })
  }
})

//! UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          {new: true}
        );
        res.status(200).json(
          {
            success: true,
            data: {updatedPost}
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
});

//! DELETE POST
router.delete("/:id", async (req, res) => {
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
});

//! GET POST BY ID
router.get("/:id", async (req, res) => {
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
});

//! GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({username});
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
        data: {posts}
      });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err
    });
  }
});

module.exports = router;
