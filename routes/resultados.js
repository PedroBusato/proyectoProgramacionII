let express = require('express');
let router = express.Router();
let controller = require("../controllers/resultadosController");

router.get("/", controller.showResult); //No se aun si es necesario agregar el :busqueda? a la ruta --> Preguntar en clase

// Podriamos transferir este router a INDEX!

module.exports = router;