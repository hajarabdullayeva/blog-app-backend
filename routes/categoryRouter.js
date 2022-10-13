const router = require("express").Router();
const categoryController = require("../controller/CategoryController");
const categoryValidation = require("../validation/category.validation");

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getOneCategory);
router.post("/", categoryValidation, categoryController.addCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
