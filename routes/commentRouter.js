const router = require("express").Router();
const commentsContoller = require("../controller/commentsContoller");

router.get("/", commentsContoller.getComments);
router.get("/:id", commentsContoller.getCommentById);
router.post("/:id", commentsContoller.postComment);

module.exports = router;
