let express = require('express');
let router = express.Router();
let controller = require("../controllers/indexController");

// Por el momento en index pondremos las rutas a las vistas index, login y registracion
router.get("/", controller.homePage);
router.get("/login", controller.loginPage);
router.get("/registracion", controller.registerPage);


module.exports = router;
