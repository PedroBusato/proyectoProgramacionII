const moduloUsers = require("../data/users");
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
    }
}

module.exports = controller;