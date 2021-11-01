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
            db.Post.create({
                image: req.body.image,
                postDescription: req.body.postDescription,
                idUser: req.session.user.userId
            })
        }
        res.redirect("/")
    },
    // detailPost: async function(req, res){                                      // Lo unico que nos queda por encontrar son las fotos de perfil de los usuarios que realizan los comentarios
    //     let postId = req.params.post;
    //     let post = await db.Post.findByPk(postId);
    //     let comments = await db.Comment.findAll( {where: {idPost: postId}});
    //     let user = await db.User.findOne({where: {idUser: post.idUser}})
    //     let users = await db.User.findAll();
    //     res.render("detallePostCopy", {post, comments, user, users})
    // },
    detailPost: async function(req, res){                                      // Lo unico que nos queda por encontrar son las fotos de perfil de los usuarios que realizan los comentarios
        let postId = req.params.post;
        let post = await db.Post.findByPk(postId, {
            include: [{association: "user"}]       
        });
        let comments = await db.Comment.findAll({
            where: {idPost: postId},
            include: [{association: "user"}]
        });
        // let comments = await db.Comment.findAll( {where: {idPost: postId}});
        // let user = await db.User.findOne({where: {idUser: post.idUser}})
        // let users = await db.User.findAll();
        res.render("detallePostCopy", {post, comments})
    },
    detailPostComment: async function(req, res){                                      // Lo unico que nos queda por encontrar son las fotos de perfil de los usuarios que realizan los comentarios
        if (!req.session.user){                                                       //Autenticacion --> Verifico que hay un usuario en session
            res.redirect("/")
        }
        db.Comment.create({
            idPost: req.params.post,
            userName: "No aprendimos aun sesion",
            idUser: 1,                                         //Por el momento, debemos hardcodear el nombre del usuario y su id
            commentText: req.body.commentText
        })
            .then(function(){
                res.redirect("/post/detailPost/"+req.params.post)
            })
            .catch(function(){
                res.render("error", {error: "No se ha podido publicar el comentario.", ruta: "/post/detailPost/"+req.params.post})
            })
    },
    // postStore: function(req, res){

    // }
} 



module.exports = controller;