const moduloUsers = require("../data/userModule");
const moduloPosts = require("../data/posts");
// const moduloComments = require("../data/comentarios");

const  controller = {
    user: function(req, res){
        let usuario = req.params.usuario;
        let usuarioInfo = moduloUsers.findUser(usuario);
        let arrayImagenes = moduloPosts.imagesByUsername(usuario);
        res.render("detalleUsuario", {usuario: usuarioInfo, imagenes: arrayImagenes});   //Por el momento pasamos al informacion del modulo que creamos
    },
    // post: function(req, res){
    //     let idPost = req.params.post
    //     let postInfo = moduloPosts.imagesByPostId(idPost);                               //Busco la imagen a traves de su "id"
    //     let postComments = moduloComments.commentsById(idPost);                          //Busco los comentarios de la imagen a traves del "id" de la imagen
    //     let user = postInfo.usuario;
    //     let userInfo = moduloUsers.findUser(user);                                       //Busco la informacion del "user" a partir de su nombre de usuario
    //     res.render("detallePost", {post: postInfo, user: userInfo, comments: postComments, usuarios: moduloUsers}); //Paso el moduloUsers ya que necesito su funcion de encontrar usuarios para poner las fotos de perfil de quienen comentan
    // }
}

module.exports = controller;    