const moduloUsers = require("../data/users");
const moduloPosts = require("../data/posts");
const moduloComments = require("../data/comentarios");
const db = require("../database/models");
const op = db.Sequelize.Op;


const controller = {
    addPost: function(req, res){
        res.render("agregarPost")
    },
    // detailPost: function(req, res){
    //     let idPost = req.params.post
    //     let postInfo = moduloPosts.imagesByPostId(idPost);                                                          //Busco la imagen a traves del postId
    //     let postComments = moduloComments.commentsById(idPost);                                                     //Busco los comentarios de la imagen a traves del postId
    //     let user = postInfo.usuario;
    //     let userInfo = moduloUsers.findUser(user);                                                                  //Busco la informacion del "user" a partir de su nombre de usuario
    //     res.render("detallePost", {post: postInfo, user: userInfo, comments: postComments, usuarios: moduloUsers}); //Paso el moduloUsers ya que necesito su funcion de encontrar usuarios para poner las fotos de perfil de quienen comentan
    // },
    detailPost: async function(req, res){                                      // Lo unico que nos queda por encontrar son las fotos de perfil de los usuarios que realizan los comentarios
        let postId = req.params.post;
        let post = await db.Post.findByPk(postId);
        let comments = await db.Comment.findAll( {where: {idPost: postId}});
        let user = await db.User.findOne({where: {idUser: post.idUser}})
        let users = await db.User.findAll();
        res.render("detallePostCopy", {post, comments, user, users})
    },
    detailPostComment: async function(req, res){                                      // Lo unico que nos queda por encontrar son las fotos de perfil de los usuarios que realizan los comentarios
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
                req.render("error", {error: "No se ha podido publicar el comentario.", ruta: "/post/detailPost/"+req.params.post})
            })
    },
    // postStore: function(req, res){

    // }
} 



module.exports = controller;