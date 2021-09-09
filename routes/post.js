let express = require('express');
let router = express.Router();
let controller = require("../controllers/postController")


router.get("/", controller.addPost);


module.exports = router;