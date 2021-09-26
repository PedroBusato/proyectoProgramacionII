let express = require('express');         
let router = express.Router();
let controller = require("../controllers/indexController");

router.get("/", controller.homePage);
router.get("/login", controller.loginPage);               // Todas las rutas son rutas sin parametros, no dinamicas
router.get("/register", controller.registerPage);
router.get("/results", controller.showResult);

module.exports = router;
