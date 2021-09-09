let modulo = require("../data/userModule")

const controller = {
    myProfile: function(req, res){
        res.render("miPerfil", {user: modulo.lista[1]});
    },
    editProfile: function(req, res){
        res.render("editarPerfil", {user: modulo.lista[1]});
    }
}



module.exports = controller;