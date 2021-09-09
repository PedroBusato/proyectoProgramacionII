const moduloUsers = require("../data/userModule");
const moduloPosts = require("../data/posts");

const controller = {
    homePage: function(req, res){
        res.render("index", {usuarios: moduloUsers.lista, posts:moduloPosts})
    }, 
    loginPage: function(req, res){
        res.render("login", {message: "juan"})
    },
    registerPage: function(req, res){
        res.render("registracion", {message: "juan"})
    }
}

module.exports = controller;