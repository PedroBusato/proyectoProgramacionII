let express = require('express');         
let router = express.Router();
let controller = require("../controllers/indexController");

router.get("/", controller.homePage);

router.get("/login", controller.loginPage);               // Todas las rutas son rutas sin parametros, no dinamicas
router.post("/login", controller.login);                  // Necesitamos la ruta de POST para hacer uso de lo ingresado por input

router.get("/logout", controller.logout);

router.get("/register", controller.registerPage);         // Muestra la vista del formulario
router.post("/register", controller.registerStore);

router.get("/results", controller.showResult);

module.exports = router;
