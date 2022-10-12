const router = require("express").Router();
const newsController = require("../controller/newsController");

router.get("/", newsController.getAllNews);
router.get("/:id", newsController.getOneNews);
router.post("/", newsController.createNews);
router.put("/:id", newsController.updateNews);
router.delete("/:id", newsController.deleteNews);

module.exports = router;
