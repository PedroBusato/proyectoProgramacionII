const moduloUsers = require("../data/users");
const moduloPosts = require("../data/posts");

const controller = {
    myProfile: function(req, res){
        let coincide = false;
        let InputUsuario = req.query.usuario;
        let InputContrasena = req.query.contrasena;
        for (let i = 0; i < moduloUsers.lista.length; i++) {
            if (moduloUsers.lista[i].usuario == InputUsuario && moduloUsers.lista[i].contrasena == InputContrasena) {
                coincide = true;
            }  
        };
        if (coincide == true){
            postsUsuario = moduloPosts.imagesByUsername(InputUsuario);
            res.render("miPerfil", {infoUsuario: moduloUsers.findUser(InputUsuario), posts: postsUsuario});
        }else{
            res.render("error", {error: "El usuario o la contraseña no corresponden"}); //Crear la vista "error" de manera apropiada
        }
    },
    editProfile: function(req, res){
        res.render("editarPerfil", {user: moduloUsers.lista[1]});
    },
    detailUser: function(req, res){
        let usuario = req.params.user;
        let usuarioInfo = moduloUsers.findUser(usuario);
        let arrayImagenes = moduloPosts.imagesByUsername(usuario);
        res.render("detalleUsuario", {usuario: usuarioInfo, imagenes: arrayImagenes});   //Por el momento pasamos al informacion del modulo que creamos
    }
}



module.exports = controller;