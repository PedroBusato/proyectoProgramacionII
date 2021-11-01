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
        let postsIndex = await db.Post.findAll();                                     //Encuentro todos los posts
        let commentsIndex = await db.Comment.findAll();                               //Encuentro todos los comentarios
        res.render("indexCopy", {postsIndex, commentsIndex})
    },

    loginPage: function(req, res){
        res.render("login")
    },

    login: async function(req, res){
        let user = await db.User.findOne({where: {userName: req.body.userName}})            //Buscamos el usuario mediante el nombre de usuario que se ingresa en el input del formulario
        if(user){
            if (bcrypt.compareSync(req.body.userPassword, user.userPassword)) {             //Compara la contraseña que ingresa el usuario con la contraseña de la base de datos, que ya se encuentra hasheada
                req.session.user = user;                                                    //Almacena en la propiedad "user" de la session la informacion del usuario que se loguea mediante el formulario --> creamos nuestra sesion, a la cual podemos acceder desde los distintos archivos js!
                res.cookie("userId", user.idUser, { maxAge: 1000 * 60 * 60 * 24 * 30 });    //Crea una cookie de nombre "userId" donde almacena la id del usuario que se logueo --> se convierte en el identificador de nuestro usuario
                res.redirect("/");
            } else{
                res.send("La contraseña es incorrecta. Intente nuevamente")
            }
        } else{
            res.render("error", {error: "No existe el usuario", ruta:"/login"})
        }
    },

    logout: function(req, res){
        res.clearCookie('userId');                                                    //Eliminamos nuestra cookie "user"
        req.session.user = null;                                                      //Acabamos con nuestra sesion        
        res.redirect('/');
    }, 

    registerPage: function(req, res){
        res.render("registracion")
    },

    registerStore: function(req, res){                                                //Duda si los inputs del usuario en el formulario deben ir en el mismo orden que las columnas de la tabla
        req.body.userPassword = bcrypt.hashSync(req.body.userPassword, 10);           //Sobreescribimos lo que ingresa el usuario en el formulario por su contraseña hasheada
        db.User.create(req.body)                                                      //Al agregar la propiedad "name" con el atributo identico a las columnas de la base de datos, no es necesario todo el codigo comentado debajo
            .then(function(){
                res.redirect("/")                                                     //Me redirecciona al index una vez que la promesa se cumplio
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

    showResult: async function(req, res){
        let userInput = req.body.search;
        const posts = await db.Post.findAll({where: {postDescription: {[op.like]: `%${userInput}%` }} })
        if (posts) {
            res.render("resultadoBusqueda", {posts}) //Checkear que la vista funciones bien con lo que pasamos por controlador
        } else{

        }
    }
}

module.exports = controller;