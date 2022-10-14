const router = require("express").Router();
const categroiesController = require("../controller/categoriesController");

router.post("/", categroiesController.addCategory);
router.put("/:id", categroiesController.updateCategory);
router.delete("/:id", categroiesController.deleteCategroy);
router.get("/:id", categroiesController.getCategoryById);
router.get("/", categroiesController.getAllCategories);

module.exports = router;