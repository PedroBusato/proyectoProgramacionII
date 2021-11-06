const moduloUsers = require("../data/users");
const moduloPosts = require("../data/posts");
const moduloComments = require("../data/comentarios");
const db = require("../database/models");
const op = db.Sequelize.Op;


const controller = {
    addPost: function(req, res){
        res.render("agregarPost")
    },

    storePost: function(req, res){
        if (req.file) {
            req.body.image = ("/images/"+ req.file.filename);
        }
        db.Post.create({
            image: req.body.image,
            postDescription: req.body.postDescription,
            idUser: req.session.user.idUser,
            userName: req.session.user.userName
        })
        res.redirect("/")
    },

    detailPost: async function(req, res){                                             // Lo unico que nos queda por encontrar son las fotos de perfil de los usuarios que realizan los comentarios        
        let post = await db.Post.findByPk(req.params.post, {
            include: [
                { association: "user" },
                { association: "comments", include:[{association: "user"}] }
            ]       
        });
        res.render("detallePostCopy", {post})
    },

    detailPostComment: function(req, res){                                            // Lo unico que nos queda por encontrar son las fotos de perfil de los usuarios que realizan los comentarios
        if (!req.session.user){                                                       // Autenticacion --> Verifico que hay un usuario en session
            db.Comment.create({
                idPost: req.params.post,
                userName: req.session.user.userName,
                idUser: req.session.user.idUser,                                        
                commentText: req.body.commentText
            })
                .then(function(){
                    res.redirect("/post/detailPost/"+req.params.post)
                })
                .catch(function(){
                    res.render("error", {error: "No se ha podido publicar el comentario.", ruta: "/post/detailPost/"+req.params.post})
                })
        } else{
            res.redirect("/")
        }
    },
} 



module.exports = controller;