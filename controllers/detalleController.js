const moduloUsers = require("../data/userModule");
const moduloPosts = require("../data/posts");

const  controller = {
    user: function(req, res){
        let usuario = req.params.usuario;
        let usuarioInfo = moduloUsers.findUser(usuario);
        let arrayImagenes = moduloPosts.imagesByUsername(usuario);
        res.render("detalleUsuario", {usuario: usuarioInfo, imagenes: arrayImagenes});   //Por el momento pasamos al informacion del modulo que creamos
    },
    post: function(req, res){
        res.render("detallePost", {pedro:"pedro"});
    }
}

module.exports = controller;    