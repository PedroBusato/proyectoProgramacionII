// Este modulo lo utilizamos para la relacion many to many entre posts y comentarios
// Dentro de este modulo, que simula una tabla pivot entre la tabla de posts y la tabla de comenatarios
// Debemos requerir los dos modulos y realizar una funcion que reciba un id de post y busque los comentarios del post
const moduloPosts = require("./comentarios");
const moduloPosts = require("./posts");

const postsComentarios = {
    comentariosByPostId: function(id) {
        // let listaComentarios 
    }
}

module.exports = postsComentarios;