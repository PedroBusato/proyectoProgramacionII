const moduloUsers = require("../data/userModule");
const moduloPosts = require("../data/posts");
const moduloComments = require("../data/comentarios");

const controller = {
    homePage: function(req, res){
        res.render("index", {usuarios: moduloUsers.lista, posts:moduloPosts, comentarios: moduloComments})
    }, 
    loginPage: function(req, res){
        res.render("login", {message: "juan"})
    },
    registerPage: function(req, res){
        res.render("registracion", {message: "juan"})
    }
}

module.exports = controller;