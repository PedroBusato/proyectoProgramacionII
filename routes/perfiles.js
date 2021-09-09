// En este archivo las rutas a los perfiles:
// editarPerfil.ejs
// miPerfil.ejs

let express = require("express");
let router = express.Router();
let controller = require("../controllers/perfilesController")

router.get("/miPerfil", controller.myProfile);
router.get("/editarPerfil", controller.editProfile);
module.exports = router;