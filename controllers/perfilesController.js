const db = require("../database/models");
const bcrypt = require('bcryptjs');

const controller = {
    myProfile: async function(req, res){
        if (req.session.user) {                                                      // Recordemos que "req.session.user" es la propiedad de la session, accesible en todos los archivos
            let user = await db.User.findOne({
                where: {userName: req.params.user},                             
                include: [
                    {association: "posts"},
                    {association: "followers"},
                    {association: "followings"}
                ] 
            })                            
            res.render("miPerfil", {user})
        }else{
            res.redirect("/")
        }
    },

    editProfileView: function(req, res){
        if (req.session.user.userName == req.params.user) {
            res.render("editarPerfil");
        }else{
            res.redirect("/profile/userDetail/" + req.params.user)
        }
    },

    editProfile: function(req, res){
        if (req.session.user.userName == req.params.user) {
            if (req.file) {
                req.body.profilePic = "/images/"+ req.file.filename;                                                      //Cambiamos el nombre del archivos de la foto de perfil en caso de haber subido una foto de perfil
            }
            let user = req.session.user;                                                                                  //Usuario en session!
            if ( user.userName == req.body.userName && user.email == req.body.email && bcrypt.compareSync(req.body.userPassword, user.userPassword) ) {   //Verificamos que el usuario en session sea el mismo que esta modificando el perfil
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
                    res.redirect("/profile/userDetail/" + req.params.user)  
                }
            } else{
                res.redirect("/profile/editProfile/" + req.params.user)
            }
        } else {
            res.redirect("/login") 
        }
    }, 

    detailUser: async function(req, res){
        let userName = req.params.user;
        let user =  await db.User.findOne({                                                                               // No buscamos por pk ya que el userName no representa una primary key! findOne() devolvera el primer usuario con dicho nombre!
            where: {userName: userName},
            include: [
                {association: "posts"},                                                    
                {association: "followers"},
                {association: "followings"},
            ],
            order:[["posts", "postedDate","DESC"]]                                                                        // Aclaramos que lo que ordenamos es la asociacion "posts"                     
        });       

        res.render("detalleUsuarioCopy", {user});
    }, 
 
    followUser: function(req, res){
        if (!req.session.user) {
            res.redirect("/login")
        } else{
            db.User.findOne({where: {userName : req.params.user}})                                  
            .then(function(userFollowing){
                db.Follow.create({
                    idFollower: req.session.user.idUser,
                    idFollowing: userFollowing.idUser
                })
                res.redirect(`/profile/userDetail/${ req.params.user}`)
            }) 
        }
    },
  
    unfollowUser: function(req, res){ 
        if (!req.session.user) { 
            res.redirect("/login")
        } else{
            db.User.findOne({where: {userName : req.params.user}})
                .then(function(userFollowing){
                    db.Follow.destroy({ 
                        where: {
                            idFollower: req.session.user.idUser, idFollowing: userFollowing.idUser
                        }
                    })
                    res.redirect(`/profile/userDetail/${ req.params.user}`)
                })
        }
    } 
}

module.exports = controller;