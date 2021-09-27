let express = require("express");
let router = express.Router();
let controller = require("../controllers/perfilesController")

router.get("/myProfile", controller.myProfile);
router.get("/editProfile", controller.editProfile);
router.get("/userDetail/:user", controller.detailUser);

module.exports = router;