const modulo = require("../data/userModule");

const controller = {
    showResult: function(req, res){
        let inputUsuario = req.params.search;
        res.render("resultadoBusqueda", {busqueda: inputUsuario});
    }
}

module.exports = controller;