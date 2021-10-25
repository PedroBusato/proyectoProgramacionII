let express = require('express');
let router = express.Router();
let controller = require("../controllers/postController")

router.get("/addPost", controller.addPost);

router.get("/detailPost/:post", controller.detailPost);
router.post("/detailPost/:post", controller.detailPostComment);

module.exports = router;