const moduloUsers = require("../data/users");
const moduloPosts = require("../data/posts");
const moduloComments = require("../data/comentarios");
const db = require("../database/models");
const op = db.Sequelize.Op;


const controller = {
    addPost: function(req, res){
        if (req.session.user) {
            res.render("agregarPost")
        } else{
            res.redirect("/login")
        }
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

    deletePost: async function(req, res){
        if (!req.session.user) {
            res.redirect("/login")
        } else{
            const post = await db.Post.findByPk(req.params.post);
            if (req.session.user.idUser == post.idUser) {
                db.Post.destroy({
                    where: {
                        idPost: req.params.post
                    }
                })
            }
            res.redirect("/profile/myProfile/" + req.session.user.userName)    
        }
    },

    editPost: function(req, res){
        if (req.session.user) {
            res.render("editarPost")
        } else{
            res.redirect("/login")
        }
    },

    updatePost: async function(req, res){
        const post = await db.Post.findOne({where: {idPost: req.params.post} });
        if (req.session.user.idUser == post.idUser) {
            if (req.file) {
                req.body.image = "/images/" + req.file.filename
            }
            db.Post.update({
                image: req.body.image,
                postDescription: req.body.postDescription
            },
            {
                where: {
                    idPost: post.idPost
                }
            })
            res.redirect("/profile/myProfile/" + req.session.user.userName)
        } else{
            res.redirect("/post/detailPost/" + req.params.post)
        }
    },

    detailPost: async function(req, res){                                             // Lo unico que nos queda por encontrar son las fotos de perfil de los usuarios que realizan los comentarios        
        let post = await db.Post.findByPk(req.params.post, {
            include: [
                { association: "user" },
                { association: "comments", include:[{association: "user"}] }
            ],
            order:[["comments", "createdAt","DESC"]]                                                                        // Aclaramos que lo que ordenamos es la asociacion "posts"                     
        });
        res.render("detallePostCopy", {post})
    },

    detailPostComment: function(req, res){                                            // Lo unico que nos queda por encontrar son las fotos de perfil de los usuarios que realizan los comentarios
        if (req.session.user){                                                       // Autenticacion --> Verifico que hay un usuario en session
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
            res.redirect("/login")
        }
    },
} 



module.exports = controller;