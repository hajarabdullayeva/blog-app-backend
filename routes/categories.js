const router = require("express").Router();
const categroiesController = require("../controller/categoriesController");

router.post("/", categroiesController.addCategory);
router.put("/:id", categroiesController.updateCategory);
router.delete("/:id", categroiesController.deleteCategroy);
router.get("/:id", categroiesController.getCategoryById);
router.get("/", categroiesController.getAllCategories);

module.exports = router;

// const router = require("express").Router();
// const Category = require("../models/Category");
// const Post = require("../models/Post");

// //! CREATE CATEGORY
// router.post("/", async (req, res) => {
//   const newCat = new Category(req.body);
//   try {
//     const savedCat = await newCat.save();
//     res.status(200).json(
//       {
//         success: true,
//         data: {savedCat}
//       });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err
//     });
//   }
// });

// //! UPDATE CATEGORY
// router.put("/:id", async (req, res) => {
//   try {
//     const cat = await Category.findById(req.params.id);
//     if (cat.username === req.body.username) {
//       try {
//         const updatedCategory = await Category.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: req.body,
//           },
//           {new: true}
//         );
//         res.status(200).json(
//           {
//             success: true,
//             data: {updatedCategory}
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
//         message: "You can update only your category!"
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err
//     });
//   }
// });

// //! DELETE CATEGORY
// router.delete("/:id", async (req, res) => {
//   try {
//     const cat = await Category.findById(req.params.id);
//     if (cat.username === req.body.username) {
//       try {
//         await cat.delete();
//         res.status(200).json(
//           {
//             success: true,
//             message: "Category has been deleted..."
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
//         message: "You can delete only your category!"
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err
//     });
//   }
// });

// //! GET CATEGORY BY ID
// router.get("/:id", async (req, res) => {
//   try {
//     const cat = await Category.findById(req.params.id);
//     res.status(200).json(
//       {
//         success: true,
//         data: cat
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

// //! GET ALL CATEGORIES
// router.get("/", async (req, res) => {
//   try {
//     const cats = await Category.find();
//     res.status(200).json(
//       {
//         success: true,
//         data: {cats}
//       });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: err
//     });
//   }
// });

// module.exports = router;
