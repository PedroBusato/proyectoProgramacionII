const moduloUsers = require("../data/users");                //Representan nuestros modelos dentros del patron MVC --> No estan en contacto directo con las vistas
const moduloPosts = require("../data/posts");

const controller = {
    homePage: function(req, res){
        let postsUsuarios = [];
        for (let i = 0; i < moduloUsers.lista.length; i++) {
            postsUsuarios.push(moduloPosts.imagesById(moduloUsers.lista[i].id));                                   //Teniamos las vistas muy cargadas de logica, y decidimos traerlas al controller
        }
        res.render("index", {usuarios: moduloUsers.lista, postsIndex: postsUsuarios}) //El orden de los usuarios es igual al de las imagenes, por lo que en el index se veran en el orden correcto
    }, 
    loginPage: function(req, res){
        res.render("login", {message: "juan"})
    },
    registerPage: function(req, res){
        res.render("registracion", {message: "juan"})
    },
    showResult: function(req, res){
        let inputUsuario = req.query.search;             // query.search en lugar de params.search
        res.render("resultadoBusqueda", {busqueda: inputUsuario});
    }
}

module.exports = controller;