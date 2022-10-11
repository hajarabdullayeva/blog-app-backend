const router = require("express").Router();
const newsController = require("../controller/newsController");

router.get("/", newsController.getAllNews);
// router.get("/:id", newsController.getOneNews);
router.post(
  "/",
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content  is required"),
  newsController.createNews
);

module.exports = router;
