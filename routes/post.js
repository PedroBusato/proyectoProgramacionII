let express = require('express');
let router = express.Router();
let controller = require("../controllers/postController");
const multer = require("multer");                                                     //Multer funciona como un middleware --> Fragmento de codigo que se ejecuta constantemente
const upload = multer({dest: "public/images/"});                                      //Configuramos multer para decirle que queremos que guarde los archivos en esa direccion

router.get("/addPost", controller.addPost);                                           //El parametro "image" que recibe la funcion representa el nombre del input del formulario!!!!
router.post("/addPost",  upload.single("image"), controller.storePost);               //Desde el controlador podemos acceder a la informacion del archivo mediante req.file

// Deberia haber una ruta con get?

router.post("/deletePost/:post", controller.deletePost);                              //Esta dando error el metodo "post"!

router.get("/editPost/:post", controller.editPost);
router.post("/editPost/:post", upload.single("image"), controller.updatePost);

router.get("/detailPost/:post", controller.detailPost);
router.post("/detailPost/:post", controller.detailPostComment);

module.exports = router;