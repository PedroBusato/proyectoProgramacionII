let moduloUsers = require("../data/userModule")

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
            res.render("miPerfil", {infoUsuario: moduloUsers.findUser(InputUsuario)});
        }else{
            res.render("error", {error: "El usuario o la contraseña no corresponden"}); //Crear la vista "error" de manera apropiada
        }
    },
    editProfile: function(req, res){
        res.render("editarPerfil", {user: moduloUsers.lista[1]});
    }
}



module.exports = controller;