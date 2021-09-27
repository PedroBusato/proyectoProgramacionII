const moduloUsers = require("../data/users");
const moduloPosts = require("../data/posts");
const moduloComments = require("../data/comentarios");

const controller = {
    addPost: function(req, res){
        res.render("agregarPost")
    },
    detailPost: function(req, res){
        let idPost = req.params.post
        let postInfo = moduloPosts.imagesByPostId(idPost);                                                          //Busco la imagen a traves del postId
        let postComments = moduloComments.commentsById(idPost);                                                     //Busco los comentarios de la imagen a traves del postId
        let user = postInfo.usuario;
        let userInfo = moduloUsers.findUser(user);                                                                  //Busco la informacion del "user" a partir de su nombre de usuario
        res.render("detallePost", {post: postInfo, user: userInfo, comments: postComments, usuarios: moduloUsers}); //Paso el moduloUsers ya que necesito su funcion de encontrar usuarios para poner las fotos de perfil de quienen comentan
    }
}


module.exports = controller;