const db = require("../database/models");                                             //Requerimos todos nuestros modelos y los guardamos en la constante db
const bcrypt = require('bcryptjs');
const op = db.Sequelize.Op;

const validateRegister = function(inputsUsuario, users){
    let errors = [];
    
    for (let i = 0; i < users.length; i++) {
        if (users[i].email == inputsUsuario.email) {
            errors.push("El email ingresado ya fue registrado")
        }   
    }

    if (inputsUsuario.email.length == 0) {
        errors.push("El email es obligatorio")
    }

    if (inputsUsuario.userPassword.length < 3){
        if (inputsUsuario.userPassword.length == 0) {
            errors.push("La contraseña no debe estar vacia")
        } else{
            errors.push("La contraseña debe tener al menos 3 caracteres")
        }
    }
    return errors;
};

const controller = {
    homePage: async function(req, res) {  
        let posts = await db.Post.findAll({ 
            order:[['createdAt','DESC']], 
            include: [
                { association: "user" },
                { association: "likes"},
                { association: "comments", include: [{ association: "user" }] }
            ]})                                                                  
        res.render("index", { posts })
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
            res.redirect(`/profile/myProfile/${req.session.user.userName}`)
        }
    },  

    login: async function(req, res){                                                                  
        let user;
        if (req.body.userLogIn.includes("@")) {                                        
            user = await db.User.findOne({where: {email: req.body.userLogIn}})           
        } else {
            user = await db.User.findOne({where: {userName: req.body.userLogIn}})            
        }

        if(!user){
            res.render("error", {error: "No existe el usuario ingresado", ruta: "/login"})
        }
        if (req.body.userPassword.length > 0 && bcrypt.compareSync(req.body.userPassword, user.userPassword)) {                 //Compara la contraseña que ingresa el usuario con la contraseña de la base de datos, que ya se encuentra hasheada --> Necesitamos que la contraseña tenga length mayor a cero para evitar que falle el "bcrypt.compareSync"
            req.session.user = user;                                                                                            //Almacena en la propiedad "user" de la session la informacion del usuario que se loguea mediante el formulario --> creamos nuestra sesion, a la cual podemos acceder desde los distintos archivos js!
            if (req.body.rememberMe == "true") {    
                res.cookie("userId", user.idUser, { maxAge: 1000 * 60 * 60 * 24 * 30 });                                        //Crea una cookie de nombre "userId" donde almacena la id del usuario que se logueo --> se convierte en el identificador de nuestro usuario. En este caso, "user" refiere a la variable declarada en la linea 38, NO a la propiedad "user" de nuestra session
            }
            res.redirect("/");
        } else{
            res.render("error", {error: "La contraseña es incorrecta", ruta: "/login"})
        }
    },

    logout: function(req, res){
        res.clearCookie('userId');                                                                                              //Eliminamos nuestra cookie "user"
        req.session.user = null;                                                                                                //Acabamos con nuestra sesion        
        res.redirect('/');
    }, 
 
    registerPage: function(req, res){                                                                           //Se encarga de mostrar la vista con el formulario de registracion                                                       
        if (!req.session.user){
            res.render("registracion")
        } else{
            res.redirect(`/profile/myProfile/${req.session.user.userName}`)
        } 
    }, 

    registerStore: async function(req, res){                                                                    //Procesa la información del formulario de registracion                                             
        let users = await db.User.findAll();
        let errors = validateRegister(req.body, users);
        
        if (errors.length > 0) {
            res.render("error", { error: errors, ruta: "/register"})
        } else {
            if (req.file) {
                req.body.profilePic = ("/images/"+ req.file.filename);
            }
            req.body.userPassword = bcrypt.hashSync(req.body.userPassword, 10);                                 //Sobreescribimos lo que ingresa el usuario en el formulario por su contraseña hasheada
            
            db.User.create(req.body)                                                                            //Al agregar la propiedad "name" con el atributo identico a las columnas de la base de datos, detecta automaticamente a que columnas pertenecen cada uno de los datos
                .then(function(){     
                    res.redirect("/login")                                                                      //Me redirecciona al index una vez que la promesa se cumplio
                })
                .catch(function(error){
                    return res.render("error", {error, ruta: "/register"})
                })  
        }                                  
    },
    
    showResults: async function(req, res){                                            
        let posts = await db.Post.findAll({
            where: {
                postDescription: { [op.like]: `%${req.query.search}%` }                                     //El input lleva el nombre "search"
            },
            include: [{ association: 'user' }]
        })
        
        let users = await db.User.findAll({
            where: {
                userName: { [op.like]: `%${req.query.search}%`}
            }
        })
        
        res.render("resultadoBusqueda", {posts, users})
    }
}

module.exports = controller;