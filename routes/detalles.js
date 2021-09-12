// Se me ocurre poner en este archivo las rutas a las vistas de detalles:
// DetallePost.ejs
// DetalleUsuario.ejs

let express = require('express');
let router = express.Router();
let controller = require("../controllers/detalleController");

router.get("/usuario/:usuario", controller.user);
router.get("/post/:post", controller.post);

module.exports = router;
