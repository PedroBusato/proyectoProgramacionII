const moduloUsers = require("../data/users");
const moduloPosts = require("../data/posts");
const db = require("../database/models");
const bcrypt = require('bcryptjs');

const controller = {
    myProfile: async function(req, res){
        if (req.session.user) {                                                      // Recordemos que "req.session.user" es la propiedad de la session, accesible en todos los archivos
            let user = await db.User.findOne( 
                {where: {userName: req.params.user},                             
                include: [{association: "posts"}] } 
            )                            
            res.render("miPerfil", {user})
        }else{
            res.redirect("/")
        }
    },

    editProfileView: function(req, res){
        if (req.session.user) {
            res.render("editarPerfil", {user: moduloUsers.lista[1]});
        }else{
            res.redirect("/")
        }
    },

    editProfile: function(req, res){
        if (req.session.user) {
            if (req.file) {
                req.body.profilePic = "/images/"+ req.file.filename;                                                      //Cambiamos el nombre del archivos de la foto de perfil
            }
            let user = req.session.user;                                                                                  //Usuario en session!
            if ( user.userName == req.body.userName && bcrypt.compareSync(req.body.userPassword, user.userPassword) ) {   //Verificamos que el usuario en session sea el mismo que esta modificando el perfil
                if (req.body.newPassword.length > 0 && (req.body.newPassword == req.body.confirmPassword)) {                                                   //Las contraseñas introudcidas por el
                    db.User.update({                                                          
                        userPassword: bcrypt.hashSync(req.body.newPassword, 10),
                        profilePic: req.body.profilePic
                    },
                    {
                        where:{
                            idUser: req.session.user.idUser
                        }
                    })
                }
            }    
        }
        res.redirect("/")
    },
    // detailUser: function(req, res){
    //     let usuario = req.params.user;
    //     let usuarioInfo = moduloUsers.findUser(usuario);
    //     let arrayImagenes = moduloPosts.imagesByUsername(usuario);
    //     res.render("detalleUsuario", {usuario: usuarioInfo, imagenes: arrayImagenes});   //Por el momento pasamos al informacion del modulo que creamos
    // },
    detailUser: async function(req, res){
        let userName = req.params.user;
        let user =  await db.User.findOne({ where: {userName: userName} });       // No buscamos por pk ya que el userName no representa una primary key! findOne() devolvera el primer usuario con dicho nombre!
        let images = await db.Post.findAll({ where: {userName: userName} });
        res.render("detalleUsuarioCopy", {user, images});
    }
}

module.exports = controller;