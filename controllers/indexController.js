const moduloUsers = require("../data/users");                                         //Representan nuestros modelos dentros del patron MVC --> No estan en contacto directo con las vistas
const moduloPosts = require("../data/posts");
const db = require("../database/models");                                             //Requerimos todos nuestros modelos y los guardamos en la constante db


const controller = {
    homePage: function(req, res){
        let postsUsuarios = [];
        for (let i = 0; i < moduloUsers.lista.length; i++) {
            postsUsuarios.push(moduloPosts.imagesById(moduloUsers.lista[i].id));      //Teniamos las vistas muy cargadas de logica, y decidimos traerlas al controller
        }
        res.render("index", {usuarios: moduloUsers.lista, postsIndex: postsUsuarios}) //El orden de los usuarios es igual al de las imagenes, por lo que en el index se veran en el orden correcto
        db.Post.findAll()
            .then(function(postsIndex){
                db.User.findAll()
                res.render("index", {postsIndex})
            })
    }, 

    // Probar con este metodo en lugar de los then anidados!!!
    homePage: async function(req, res) {                                
        const postsIndex = await db.User.findByPk(req.params.username);
        const usuarios = await db.Post.findAll({where: {user_id: req.params.username}});
  
        res.render('users/detalle', { user, posts });
    },

    loginPage: function(req, res){
        res.render("login")
    },
    registerPage: function(req, res){
        res.render("registracion")
    },
    showResult: function(req, res){
        let inputUsuario = req.query.search;                                          // query.search en lugar de params.search
        let coincide = false;
        for (let x = 0; x < moduloUsers.lista.length; x++) {
            if(moduloUsers.lista[x].usuario == inputUsuario){coincide = true}
        }
        if (coincide == true) {
            res.render("resultadoBusqueda", {busqueda: moduloUsers.findUser(inputUsuario), imagenes: moduloPosts.imagesByUsername(inputUsuario)});
        }else{
            res.render("error", {error: "No hemos encontrado resultados para su busqueda"})
        }
    }
}

module.exports = controller;