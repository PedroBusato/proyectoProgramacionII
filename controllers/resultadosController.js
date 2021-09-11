const modulo = require("../data/userModule");

const controller = {
    showResult: function(req, res){
        let inputUsuario = req.query.search;             // query.search en lugar de params.search
        res.render("resultadoBusqueda", {busqueda: inputUsuario});
    }
}

module.exports = controller;