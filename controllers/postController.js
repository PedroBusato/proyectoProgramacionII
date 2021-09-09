const controller = {
    addPost: function(req, res){
        res.render("agregarPost", {saludo: "Hola"})
    }
}



module.exports = controller;