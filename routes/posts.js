const router = require("express").Router();
const postsController = require("../controller/postsController");
const multer = require("multer");

// const Post = require("../models/Post");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage})

router.post("/", upload.single('uploaded_file'), postsController.addPost);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);
router.get("/:id", postsController.getPostById);
router.get("/", postsController.getAllPosts);

module.exports = router;

// //! CREATE POST
// router.post("/", upload.single('uploaded_file'), async (req, res) => {
//   console.log(req.file)
//   const newPost = new Post(req.body);
//   const imgPath = req.file.path.slice(6, req.file.path.length)
//   try {
//     const savedPost = await newPost.save();
//     res.status(200).json({
//       success: true,
//       data: {
//         savedPost,
//         image: imgPath
//       }
//     })
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err
//     })
//   }
// })

// //! UPDATE POST
// router.put("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         const updatedPost = await Post.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: req.body,
//           },
//           {new: true}
//         );
//         res.status(200).json(
//           {
//             success: true,
//             data: {updatedPost}
//           })
//       } catch (err) {
//         res.status(500).json({
//           success: false,
//           message: err
//         });
//       }
//     } else {
//       res.status(401).json({
//         success: false,
//         message: "You can update only your post!"
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err
//     });
//   }
// });

// //! DELETE POST
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         await post.delete();
//         res.status(200).json(
//           {
//             success: true,
//             message: "Post has been deleted..."
//           });
//       } catch (err) {
//         res.status(500).json({
//           success: false,
//           message: err
//         });
//       }
//     } else {
//       res.status(401).json({
//         success: false,
//         message: "You can delete only your post!"
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err
//     });
//   }
// });

// //! GET POST BY ID
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     res.status(200).json(
//       {
//         success: true,
//         data: post
//       });
//   } catch (err) {
//     res.status(500).json(
//       {
//         success: false,
//         message: err
//       }
//     );
//   }
// });

// //! GET ALL POSTS
// router.get("/", async (req, res) => {
//   const username = req.query.user;
//   const catName = req.query.cat;
//   try {
//     let posts;
//     if (username) {
//       posts = await Post.find({username});
//     } else if (catName) {
//       posts = await Post.find({
//         categories: {
//           $in: [catName],
//         },
//       });
//     } else {
//       posts = await Post.find();
//     }
//     res.status(200).json(
//       {
//         success: true,
//         data: {posts}
//       });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err
//     });
//   }
// });

// module.exports = router;
