const moduloUsers = require("../data/users");                                         //Representan nuestros modelos dentros del patron MVC --> No estan en contacto directo con las vistas
const moduloPosts = require("../data/posts");
const db = require("../database/models");                                             //Requerimos todos nuestros modelos y los guardamos en la constante db
const bcrypt = require('bcryptjs');

const controller = {
    // homePage: function(req, res){
    //     let postsUsuarios = [];
    //     for (let i = 0; i < moduloUsers.lista.length; i++) {
    //         postsUsuarios.push(moduloPosts.imagesById(moduloUsers.lista[i].id));      //Teniamos las vistas muy cargadas de logica, y decidimos traerlas al controller
    //     }
    //     res.render("index", {usuarios: moduloUsers.lista, postsIndex: postsUsuarios}) //El orden de los usuarios es igual al de las imagenes, por lo que en el index se veran en el orden correcto
    //     db.Post.findAll()
    //         .then(function(postsIndex){
    //             db.User.findAll()
    //             res.render("index", {postsIndex})
    //         })
    // }, 

    homePage: async function(req, res) {  
        let postsIndex = await db.Post.findAll();                                     //Encuentro todos los posts
        let commentsIndex = await db.Comment.findAll();                               //Encuentro todos los comentarios
        res.render("indexCopy", {postsIndex, commentsIndex})

        // db.Post.findAll()
        //     .then(function(postsIndex){
        //         console.log(postsIndex)
        //         res.render("indexCopy", {postsIndex});  //Renderizamos la vista, pero nos falta algo aun: comentario y foto de perfil de quien realizo el post
        //     }).catch(function(){
        //         res.render("error", {error: "Hay un error"})  
        //     })
        // 
        // const posts = await db.Post.findAll(); //No necesitamos por el momento mostrar las fotos de perfil de los usuarios que realizan los posts
        // // // const postsIndex = await db.User.findByPk(req.params.username);
        // // const users = await db.Post.findAll({where: {user_id: req.params.username}});
        // res.render("index", { usuarios: users, postsIndex: posts });
    },

    login: async function(req, res){
        if (req.method == "POST"){
            let user = await db.User.findOne({where: {userName: req.body.usuario}}) //Buscamos el usuario mediante el nombre de usuario que se ingresa en el input del formulario
            if (!user){
                res.render("error", {error: "No existe el usuario ingresado"})      //Si no encuentra el usuario en la base de datos, renderiza la vista de error
            } else {
                res.render("index")
            }
            // if (bcrypt.compareSync(req.body.contrasena, user.userPassword)) {
            //     // Aca deberiamos comenzar la sesion --> Aun no lo vimos
            // }else{
            //     render.send("La contraseña es incorrecta")
            // }
        } else {
            res.render("login")
        }
    },

    // Probar con este metodo en lugar de los then anidados!!!
    // homePage: async function(req, res) {                                
    //     const postsIndex = await db.User.findByPk(req.params.username);
    //     const usuarios = await db.Post.findAll({where: {user_id: req.params.username}});
  
    //     res.render('users/detalle', { user, posts });
    // },

    loginPage: function(req, res){
        res.render("login")
    },
    registerPage: function(req, res){
        res.render("registracion")
    },
    registerStore: function(req, res){                                                //Duda si los inputs del usuario en el formulario deben ir en el mismo orden que las columnas de la tabla
        req.body.password = bcrypt.hashSync(req.body.password, 10);                   //Sobreescribimos lo que ingresa el usuario en el formulario por su contraseña hasheada
        db.User.create({
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userPassword: req.body.password,
            profilePic: req.body.picture,
            birthDate: req.body.birthDate,
        })
            .then(function(){
                res.redirect("/")                                                     //Me redirecciona al index una vez que la promesa se cumplio
            }).catch(function(error){
                return res.render("error", {error})
            })                                           
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