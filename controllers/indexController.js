const moduloUsers = require("../data/users");                                         //Representan nuestros modelos dentros del patron MVC --> No estan en contacto directo con las vistas
const moduloPosts = require("../data/posts");
const db = require("../database/models");                                             //Requerimos todos nuestros modelos y los guardamos en la constante db
const bcrypt = require('bcryptjs');
const op = db.Sequelize.Op;

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
        let posts = await db.Post.findAll({ 
            include: [
                { association: "user" },
                { association: "likes"},
                { association: "comments", include: [{ association: "user" }] }
            ]})                                   
        // let commentsIndex = await db.Comment.findAll();                               
        res.render("indexCopy", { posts })
    },

    likePost: async function(req, res) {
        if (!req.session.user) {
            res.redirect("/login")
        }
        db.Like.create({
            idUser: req.session.user.idUser,
            idPost: req.params.idPost
        })
        res.redirect("/#post_" + req.params.idPost)
    },

    dislikePost: async function(req, res) {
        if (!req.session.user) {
            res.redirect("/login")
        }
        db.Like.destroy({ 
            where:{
                idUser: req.session.user.idUser, idPost: req.params.idPost
            }
        })
        res.redirect("/#post_" + req.params.idPost)
    },

    loginPage: function(req, res){
        if (!req.session.user){
            res.render("login")
        } else {
            res.redirect("/")
        }
    },

    login: async function(req, res){                                                                    //Intentamos que permita realizar el log in a traves del email del usuario tambien
        let user;
        if (req.body.userLogIn.includes("@")) {                                        
            user = await db.User.findOne({where: {email: req.body.userLogIn}})           
        } else {
            user = await db.User.findOne({where: {userName: req.body.userLogIn}})            
        }

        if(!user){
            res.render("error", {error: "No existe el usuario ingresado", ruta: "/login"})
        }
        if (bcrypt.compareSync(req.body.userPassword, user.userPassword)) {                         //Compara la contraseña que ingresa el usuario con la contraseña de la base de datos, que ya se encuentra hasheada
            req.session.user = user;                                                                //Almacena en la propiedad "user" de la session la informacion del usuario que se loguea mediante el formulario --> creamos nuestra sesion, a la cual podemos acceder desde los distintos archivos js!
            if (req.body.rememberMe == "true") {    
                res.cookie("userId", user.idUser, { maxAge: 1000 * 60 * 60 * 24 * 30 });            //Crea una cookie de nombre "userId" donde almacena la id del usuario que se logueo --> se convierte en el identificador de nuestro usuario. En este caso, "user" refiere a la variable declarada en la linea 38, NO a la propiedad "user" de nuestra session
            }
            res.redirect("/");
        } else{
            res.render("error", {error: "La contraseña es incorrecta", ruta: "/login"})
        }
    },

    logout: function(req, res){
        res.clearCookie('userId');                                                                      //Eliminamos nuestra cookie "user"
        req.session.user = null;                                                                        //Acabamos con nuestra sesion        
        res.redirect('/');
    }, 

    registerPage: function(req, res){
        if (!req.session.user){
        res.render("registracion")
        } else{
            res.redirect("/")
        }
    },

    registerStore: function(req, res){                                                
        req.body.userPassword = bcrypt.hashSync(req.body.userPassword, 10);                             //Sobreescribimos lo que ingresa el usuario en el formulario por su contraseña hasheada
        db.User.create(req.body)                                                                            //Al agregar la propiedad "name" con el atributo identico a las columnas de la base de datos, detecta automaticamente a que columnas pertenecen cada uno de los datos
            .then(function(){
                res.redirect("/")                                                                       //Me redirecciona al index una vez que la promesa se cumplio
            }).catch(function(error){
                return res.render("error", {error, ruta: "/register"})
            })                                           
    },

    // showResult: function(req, res){
    //     let inputUsuario = req.query.search;                                       // query.search en lugar de params.search
    //     let coincide = false;
    //     for (let x = 0; x < moduloUsers.lista.length; x++) {
    //         if(moduloUsers.lista[x].usuario == inputUsuario){coincide = true}
    //     }
    //     if (coincide == true) {
    //         res.render("resultadoBusqueda", {busqueda: moduloUsers.findUser(inputUsuario), imagenes: moduloPosts.imagesByUsername(inputUsuario)});
    //     }else{
    //         res.render("error", {error: "No hemos encontrado resultados para su busqueda", ruta: "/"})
    //     }
    // },

    // showResult: async function(req, res){
    //     if (req.session.user) {
    //         res.render("resultadoBusqueda")
    //     } else{
    //         res.redirect("/login")
    //     }
    // },

    showResults: async function(req, res){
        let userInput = req.query.search;
        // const posts = await db.Post.findAll({where: {
        //     [op.or] : [
        //         {postDescription: { [op.like]: `%${userInput}%` }},                   //La descripcion del post contenga el input del usuario
        //         {image: { [op.like]: `%${userInput}%` }}                              //El nombre del archivo tenga el input del usuario
        //     ]
        //     }
        // })
        const posts = await db.Post.findAll({
            where: [
                {postDescription: { [op.like]: `%${userInput}%` }}
            ],
            include: [{ association: 'user' }]
        })
        res.render("resultadoBusqueda", {posts})
        // if (posts) {
        //     res.render("resultadoBusqueda", {posts}) 
        // } else{
        //     res.redirect("/")
        // }
    }
}

module.exports = controller;