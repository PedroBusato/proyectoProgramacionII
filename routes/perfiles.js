let express = require("express");
let router = express.Router();
let controller = require("../controllers/perfilesController")
const multer = require("multer");                                                    
const upload = multer({dest: "public/images/"});


router.get("/myProfile/:user", controller.myProfile);

router.get("/editProfile", controller.editProfileView);
router.post("/editProfile", upload.single("profilePic"), controller.editProfile);

router.get("/userDetail/:user", controller.detailUser);

module.exports = router;